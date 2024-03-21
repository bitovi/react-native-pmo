import type { FC } from "react"
import type { ViewProps } from "react-native"
import { StyleSheet, View } from "react-native"
import type { Theme } from "../../theme/theme"
import useTheme from "../../theme/useTheme"

type Props = ViewProps & {
  margin?: keyof Theme["spacing"]
  padding?: keyof Theme["spacing"]
  fullWidth?: boolean
}

const Box: FC<Props> = ({
  margin,
  padding,
  fullWidth,
  style,
  children,
  ...restOfProps
}) => {
  const { theme } = useTheme()

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
      {...restOfProps}
    >
      {children}
    </View>
  )
}

export default Box
