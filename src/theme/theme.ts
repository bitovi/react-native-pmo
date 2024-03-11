import type { TextStyle } from "react-native"

const palette = {
  purple: "#5A31F4",
  green: "#0ECD9D",
  red: "#CD0E61",
  black: "#0B0B0B",
  white: "#F0F2F3",
}

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.purple,
    success: palette.green,
    danger: palette.red,
    failure: palette.red,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textStyles: {
    heading: {
      fontSize: 50,
      fontWeight: "500" as TextStyle["fontWeight"],
    },
    body: {
      fontSize: 21,
      fontWeight: "normal" as TextStyle["fontWeight"],
    },
  },
}

export type Theme = typeof theme

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
  },
}
