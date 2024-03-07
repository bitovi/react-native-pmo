import { useContext } from "react"
import type { ThemeState } from "./ThemeProvider"
import { ThemeContext } from "./ThemeProvider"

const useTheme = (): ThemeState => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error(
      "Theme context cannot be accessed outside of the ThemeProvider.",
    )
  }

  return context
}

export default useTheme
