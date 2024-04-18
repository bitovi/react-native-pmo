import type { TextStyle } from "react-native"

const palette = {
  lightGreen: "#007A82",
  green: "#005156",
  darkGreen: "#002A2D",
  red: "rgb(202, 47, 53)",
  black: "#000000",
  charcoal: "#1b1e20",
  grey: "5e6466",
  white: "#ffffff",
  offWhite: "#F0F2F3",
  lightGray: "#E0E2E3",
}

export const theme = {
  colors: {
    background: palette.offWhite,
    backgroundDark: palette.charcoal,
    border: palette.lightGray,
    foreground: palette.black,
    primary: palette.red,
    secondary: palette.green,
    success: palette.lightGreen,
    danger: palette.red,
    failure: palette.red,
    card: palette.white,
    shadow: palette.black,
    text: palette.black,
    textLight: palette.white,
    textDark: palette.charcoal,
    textLink: palette.green,
  },
  spacing: {
    none: 0,
    xs: 4,
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
    label: {
      fontSize: 12,
      fontWeight: "bold",
    },
  },
} as const

export type Theme = typeof theme

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
    textLight: palette.charcoal,
    textDark: palette.white,
  },
}
