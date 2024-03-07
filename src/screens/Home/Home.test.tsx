import { render, screen } from "@testing-library/react-native"

import Home from "./Home"

describe("<App />", () => {
  it("renders", () => {
    render(<Home />)
    expect(screen.getByText(/home/i)).toBeOnTheScreen()
  })
})
