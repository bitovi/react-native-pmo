import { render, screen } from "@testing-library/react-native"
import ListItem from "./ListItem"
import Typography from "../Typography"

describe("ListItem component", () => {
  it("renders children", () => {
    render(
      <ListItem image="Does this break it?">
        <Typography variant="body">Hello!</Typography>
      </ListItem>,
    )
    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})
