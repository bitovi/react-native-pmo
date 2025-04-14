import { forwardRef } from "react"
import {
  PressableProps,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Pressable,
  View,
  Text,
} from "react-native"

import { Theme, useTheme } from "../theme"

type Variant = "primary" | "secondary" | "outline"

export interface ButtonProps extends PressableProps {
  variant?: Variant
  margin?: keyof Theme["spacing"]
  padding?: keyof Theme["spacing"]
  fontSize?: TextStyle["fontSize"]
  fontWeight?: TextStyle["fontWeight"]
  disabled?: boolean
  children: string
}

const Button: React.ForwardRefRenderFunction<View, ButtonProps> = (
  {
    variant = "primary",
    margin,
    padding,
    fontSize = 20,
    fontWeight = "400",
    disabled,
    children,
    ...props
  },
  ref,
) => {
  const theme = useTheme()
  const styles = getStyles(theme, variant)

  return (
    <Pressable
      {...props}
      ref={ref}
      style={StyleSheet.compose(styles.pressable, {
        ...(margin ? { margin: theme.spacing[margin] } : {}),
        ...(padding ? { padding: theme.spacing[padding] } : {}),
        opacity: disabled ? 0.5 : 1,
      })}
      disabled={disabled}
    >
      <Text
        style={StyleSheet.compose(styles.text, {
          fontSize,
          fontWeight,
        })}
      >
        {children}
      </Text>
    </Pressable>
  )
}

export default forwardRef(Button)

function getStyles(
  theme: Theme,
  variant: Variant,
): {
  pressable: ViewStyle
  text: TextStyle
} {
  if (variant === "primary") {
    return StyleSheet.create({
      pressable: {
        margin: theme.spacing.s,
        padding: theme.spacing.m,
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main,
      },
      text: {
        color: theme.palette.primary.contrast,
      },
    })
  }

  if (variant === "secondary") {
    return StyleSheet.create({
      pressable: {
        margin: theme.spacing.s,
        padding: theme.spacing.m,
        borderRadius: 5,
        backgroundColor: theme.palette.secondary.main,
      },
      text: {
        color: theme.palette.secondary.contrast,
      },
    })
  }

  if (variant === "outline") {
    return StyleSheet.create({
      pressable: {
        margin: theme.spacing.s,
        padding: theme.spacing.m - 1,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: theme.palette.screen.main,
        borderColor: theme.palette.screen.contrast,
      },
      text: {
        color: theme.palette.screen.contrast,
      },
    })
  }

  throw new Error(`Button: Unknown variant: ${variant}`)
}
