import type { FC } from "react"
import type { TextProps } from "react-native"
import type { Theme } from "../theme"

import { Text, StyleSheet } from "react-native"

import { useTheme } from "../theme"

export interface TypographyProps extends TextProps {
  variant?: keyof Theme["typography"]
  color?: keyof Theme["colors"]
}

const Typography: FC<TypographyProps> = ({
  style,
  variant = "body",
  color,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <Text
      style={StyleSheet.compose(
        {
          color: color && theme.colors[color],
          ...theme.typography[variant],
        },
        style,
      )}
      {...props}
    >
      {children}
    </Text>
  )
}

export default Typography
