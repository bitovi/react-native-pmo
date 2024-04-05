import { render, screen } from "@testing-library/react-native"
import Card from "./Card"

describe("Card component", () => {
  it("renders children components 'Hello!' without issue", () => {
    render(
      <Box padding="s" margin="s">
        <Typography>Hello!</Typography>
      </Box>,
    )
    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})
