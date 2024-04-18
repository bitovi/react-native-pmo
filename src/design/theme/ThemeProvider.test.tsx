import type { FC } from "react"
import { render, screen } from "@testing-library/react-native"
import Typography from "../Typography"
import ThemeProvider, { useTheme } from "./ThemeProvider"
import { View, Text } from "react-native"

describe("ThemeProvider Provider", () => {
  it("renders children", async () => {
    render(
      <ThemeProvider>
        <Typography>Hello!</Typography>
      </ThemeProvider>,
    )

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})

describe("ThemeContext context", () => {
  const TestComponent: FC = () => {
    const theme = useTheme()

    return (
      <View>
        <Text>{theme.colors.background}</Text>
      </View>
    )
  }

  it("context properties are accessible", async () => {
    render(<TestComponent />)

    expect(screen.getByText(/#F0F2F3/)).toBeOnTheScreen()
  })
})
