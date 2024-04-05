import { render, screen } from "@testing-library/react-native"
import FormTextField from "./FormTextField"

describe("FormTextField component", () => {
  it("renders label", () => {
    render(<FormTextField label="Hello!" value="response"></FormTextField>)
    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})
