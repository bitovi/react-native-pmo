import { render, screen } from "@testing-library/react-native"
import Box from "./Box"
import Typography from "../Typography"

describe("Box component", () => {
  it("renders children components 'Hello!' without issue", () => {
    render(
      <Box padding="s" margin="s">
        <Typography>Hello!</Typography>
      </Box>,
    )
    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})
