import { forwardRef } from "react"
import {
  PressableProps,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Pressable,
  View,
} from "react-native"

import { Theme, useTheme } from "../theme"
import Typography from "../Typography"

type Variant = "primary" | "secondary" | "outline"

export interface ButtonProps extends PressableProps {
  variant?: Variant
  disabled?: boolean
  children: string
}

const Button: React.ForwardRefRenderFunction<View, ButtonProps> = (
  { variant = "primary", disabled, children, ...props },
  ref,
) => {
  const theme = useTheme()
  const styles = getStyles(theme, variant)

  return (
    <Pressable
      ref={ref}
      {...props}
      disabled={disabled}
      style={[
        styles.pressable,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Typography variant="button" style={styles.text}>
        {children}
      </Typography>
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
