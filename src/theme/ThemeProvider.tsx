import type { FC } from 'react'
import { useState, createContext } from 'react'
import type { Theme } from './theme'
import { theme, darkTheme } from './theme'

type ColorMode = 'light' | 'dark' | undefined

export type ThemeState = {
  theme: Theme,
  mode: ColorMode,
  setMode: (mode: ColorMode) => void
}

export const ThemeContext = createContext<ThemeState>({
  theme,
  mode: undefined,
  setMode: (value: ColorMode) => { },
});

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: FC<GlobalStateProviderProps> = ({
  children
}) => {
  const [mode, setMode] = useState<ColorMode>()

  return (
    <ThemeContext.Provider value={{
      theme: mode === 'dark' ? darkTheme : theme,
      mode: mode,
      setMode: (mode: ColorMode) => setMode(mode)
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider