import type { FC } from "react"
import type { ViewProps } from "react-native"
import type { Theme } from "../theme"

import { StyleSheet, View } from "react-native"

import { useTheme } from "../theme"

export interface BoxProps extends ViewProps {
  margin?: keyof Theme["spacing"]
  padding?: keyof Theme["spacing"]
  fullWidth?: boolean
}

const Box: FC<BoxProps> = ({
  margin = "none",
  padding = "none",
  fullWidth,
  style,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <View
      style={StyleSheet.compose(
        {
          display: "flex",
          margin: margin && theme.spacing[margin],
          padding: padding && theme.spacing[padding],
          ...(fullWidth ? { width: "100%" } : {}),
        },
        style,
      )}
      {...props}
    >
      {children}
    </View>
  )
}

export default Box
