import { fireEvent, render, screen } from "@testing-library/react-native"
import Press from "./Press"

describe("FormTextField component", () => {
  it("renders title", () => {
    const handleChangeMock = jest.fn()
    render(<Press title="Hello!" onPress={handleChangeMock} />)
    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
    fireEvent.press(screen.getByText(/Hello/i))
    expect(handleChangeMock).toHaveBeenCalled()
  })
})
