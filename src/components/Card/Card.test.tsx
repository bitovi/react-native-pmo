import { render, screen } from "@testing-library/react-native"
import Card from "./Card"
import Typography from "../Typography"

describe("Card component", () => {
  it("renders headline and children", () => {
    render(
      <Card headline="Hello!">
        <Typography variant="body">How are you?</Typography>
      </Card>,
    )
    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
    expect(screen.getByText(/How are you?/)).toBeOnTheScreen()
  })
})
