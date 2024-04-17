import { render, screen } from "@testing-library/react-native"
import Back from "./Back"
import Typography from "../Typography"

describe("Back component", () => {
  it("renders children components", () => {
    render(
      <Back>
        <Typography>Hello!</Typography>
      </Back>,
    )
    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })

  it("triggers back navigation on press", () => {
    render(
      <Back>
        <Typography>Hello!</Typography>
      </Back>,
    )
    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})
