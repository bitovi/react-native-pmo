import type { FC } from "react"
import type { PressableProps, ViewStyle, TextStyle } from "react-native"
import type { Theme } from "../theme"

import { StyleSheet, Pressable, Text } from "react-native"

import { useTheme } from "../theme"

export interface PressProps extends PressableProps {
  title?: string
  variant?: "primary" | "secondary" | "text"
  margin?: keyof Theme["spacing"]
  padding?: keyof Theme["spacing"]
  fontSize?: TextStyle["fontSize"]
  fontWeight?: TextStyle["fontWeight"]
  disabled?: boolean
}

const Press: FC<PressProps> = ({
  title,
  variant,
  margin,
  padding,
  fontSize = 20,
  fontWeight = "400",
  disabled,
  ...props
}) => {
  const theme = useTheme()
  const baseStyles = getStyles(theme, variant)

  return (
    <Pressable
      style={StyleSheet.compose(baseStyles.press, {
        ...(margin ? { margin: theme.spacing[margin] } : {}),
        ...(padding ? { padding: theme.spacing[padding] } : {}),
        opacity: disabled ? 0.5 : 1,
      })}
      disabled={disabled}
      {...props}
    >
      <Text
        style={StyleSheet.compose(baseStyles.text, {
          fontSize,
          fontWeight,
        })}
      >
        {title}
      </Text>
    </Pressable>
  )
}

function getStyles(
  theme: Theme,
  variant?: PressProps["variant"],
): { press: ViewStyle; text: TextStyle } {
  if (variant === "text") {
    return StyleSheet.create({
      press: {},
      text: {
        color: theme.colors.textDark,
      },
    })
  } else if (variant === "secondary") {
    return StyleSheet.create({
      press: {
        margin: theme.spacing.s,
        paddingHorizontal: theme.spacing.m,
        paddingVertical: theme.spacing.m,
        borderColor: theme.colors.secondary,
        borderWidth: 1,
        borderRadius: 5,
      },
      text: {
        color: theme.colors.secondary,
      },
    })
  }

  return StyleSheet.create({
    press: {
      margin: theme.spacing.s,
      paddingHorizontal: theme.spacing.m,
      paddingVertical: theme.spacing.m,
      backgroundColor: theme.colors.secondary,
      borderRadius: 5,
    },
    text: {
      color: theme.colors.textLight,
    },
  })
}

export default Press
