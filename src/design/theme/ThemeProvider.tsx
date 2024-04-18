import type { FC } from "react"
import type { Theme } from "./theme"

import { useState, createContext, useContext, useMemo } from "react"

import themes from "./theme"

type Mode = keyof typeof themes

interface ThemeContext {
  mode: Mode
  setMode: (mode: Mode) => void
}

export const ThemeContext = createContext<ThemeContext | undefined>(undefined)

const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>("light")

  const value = useMemo(() => ({ mode, setMode }), [mode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

function useThemeContext(): ThemeContext {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error(
      "Theme context cannot be accessed outside of the ThemeProvider.",
    )
  }

  return context
}

export function useTheme(): Theme {
  const { mode } = useThemeContext()

  return themes[mode]
}

export function useThemeMode(): {
  mode: Mode
  setMode: (mode: Mode) => void
} {
  const { mode, setMode } = useThemeContext()

  return {
    mode,
    setMode,
  }
}
