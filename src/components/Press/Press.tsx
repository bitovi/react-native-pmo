import type { FC } from "react"
import type { PressableProps, ViewStyle, TextStyle } from "react-native"
import { StyleSheet, Pressable, Text } from "react-native"
import type { Theme } from "../../theme/theme"
import useTheme from "../../theme/useTheme"

type Props = PressableProps & {
  title?: string
  margin?: keyof Theme["spacing"]
  padding?: keyof Theme["spacing"]
  fontSize?: TextStyle["fontSize"]
  fontWeight?: TextStyle["fontWeight"]
  style?: ViewStyle
}

const Press: FC<Props> = ({
  title,
  margin = "s",
  padding = "m",
  fontSize = 17,
  fontWeight = "400",
  style,
  ...restOfProps
}) => {
  const { theme } = useTheme()

  return (
    <Pressable
      style={StyleSheet.compose(style, {
        margin: margin && theme.spacing[margin],
        padding: padding && theme.spacing[padding],
        backgroundColor: theme.colors.secondary,
        color: theme.colors.textLight,
        borderRadius: 5,
      })}
      {...restOfProps}
    >
      <Text
        style={StyleSheet.compose(style, {
          color: "#fff",
          fontSize,
          fontWeight,
        })}
      >
        {title}
      </Text>
    </Pressable>
  )
}

export default Press
