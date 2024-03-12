import { fireEvent, render, screen } from "@testing-library/react-native"

import App from "./App"

describe("App", () => {
  it.skip("renders and navigates", () => {
    render(<App />)
    expect(screen.getAllByText(/home/i)[0]).toBeOnTheScreen()
    fireEvent.press(screen.getByText(/Choose a restaurant/i))
    expect(screen.getAllByText(/restaurant list/i)[0]).toBeOnTheScreen()
    fireEvent.press(screen.getByText(/restaurant 1/i))
    expect(screen.getByText(/details for restaurant 1/i)).toBeOnTheScreen()
    fireEvent.press(screen.getByText(/place an order/i))
    expect(
      screen.getByText(/place an order for restaurant 1/i),
    ).toBeOnTheScreen()
  })
})
