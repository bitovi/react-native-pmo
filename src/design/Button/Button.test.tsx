import { fireEvent, render, screen } from "@testing-library/react-native"

import Button from "./Button"

describe("Button component", () => {
  it("renders title", () => {
    const handleChangeMock = jest.fn()

    render(<Button title="Hello!" onPress={handleChangeMock} />)

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
    fireEvent.press(screen.getByText(/Hello/i))
    expect(handleChangeMock).toHaveBeenCalled()
  })
})
