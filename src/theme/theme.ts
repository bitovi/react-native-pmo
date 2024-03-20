import type { TextStyle } from "react-native"

const palette = {
  purple: "#3a4478",
  green: "#50804F",
  red: "#ca2f35",
  black: "#222222",
  white: "#FFFFFF",
  offWhite: "#F0F2F3",
  lightGray: "#E0E2E3",
}

export const theme = {
  colors: {
    background: palette.offWhite,
    border: palette.lightGray,
    foreground: palette.black,
    primary: palette.red,
    secondary: palette.purple,
    success: palette.green,
    danger: palette.red,
    failure: palette.red,
    card: palette.white,
    shadow: palette.black,
    text: palette.black,
    textLight: palette.white,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textStyles: {
    heading: {
      fontSize: 24,
      fontWeight: "500" as TextStyle["fontWeight"],
    },
    title: {
      fontSize: 21,
      fontWeight: "500" as TextStyle["fontWeight"],
    },
    body: {
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
