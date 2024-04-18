import type { FC } from "react"
import { useState, createContext, useContext } from "react"
import type { Theme } from "./theme"
import { lightTheme, darkTheme } from "./theme"

type ColorMode = "light" | "dark" | undefined

export type ThemeState = {
  theme: Theme
  mode: ColorMode
  setMode: (mode: ColorMode) => void
}

export const ThemeContext = createContext<ThemeState>({
  theme: lightTheme,
  mode: undefined,
  setMode: (value: ColorMode) => {},
})

interface GlobalStateProviderProps {
  children: React.ReactNode
}

const ThemeProvider: FC<GlobalStateProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ColorMode>()

  return (
    <ThemeContext.Provider
      value={{
        theme: mode === "dark" ? darkTheme : lightTheme,
        mode: mode,
        setMode: (mode: ColorMode) => setMode(mode),
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

export function useTheme(): Theme {
  const context = useContext(ThemeContext)

  if (typeof context === 'undefined') {
    throw new Error(
      "Theme context cannot be accessed outside of the ThemeProvider.",
    )
  }

  return context.theme
}
