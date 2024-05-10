import {
  ViewProps,
  ViewStyle,
  StyleSheet,
  ScrollView,
  View as StaticView,
} from "react-native"
import { Theme, ThemeMargin, ThemePadding, useTheme } from "../theme"

export interface BoxProps extends ViewProps {
  scrollable?: boolean
  margin?: ThemeMargin
  padding?: ThemePadding
}

const Box: React.FC<BoxProps> = ({
  scrollable = false,
  margin,
  padding,
  style,
  children,
  ...props
}) => {
  const theme = useTheme()
  const styles = getStyles(theme, { margin, padding })

  const View = scrollable ? ScrollView : StaticView

  return (
    <View style={StyleSheet.compose(styles.container, style)} {...props}>
      {children}
    </View>
  )
}

export default Box

function getStyles(
  theme: Theme,
  {
    margin,
    padding,
  }: {
    margin?: ThemeMargin
    padding?: ThemePadding
  },
): {
  container: ViewStyle
} {
  return StyleSheet.create({
    container: StyleSheet.flatten([
      {
        display: "flex",
      },
      margin && spacingToStyles(theme, "margin", margin),
      padding && spacingToStyles(theme, "padding", padding),
    ]),
  })
}

function spacingToStyles(
  theme: Theme,
  property: "margin" | "padding",
  value: ThemeMargin | ThemePadding,
): ViewStyle {
  if (typeof value === "string") {
    return {
      [property]: theme.spacing[value],
    }
  }

  if (value.length === 1) {
    return {
      [property]: theme.spacing[value[0]],
    }
  }

  if (value.length === 2) {
    return {
      [`${property}Vertical`]: theme.spacing[value[0]],
      [`${property}Horizontal`]: theme.spacing[value[1]],
    }
  }

  if (value.length === 3) {
    return {
      [`${property}Top`]: theme.spacing[value[0]],
      [`${property}Horizontal`]: theme.spacing[value[1]],
      [`${property}Bottom`]: theme.spacing[value[2]],
    }
  }

  throw new Error(`Invalid spacing value: ${value}`)
}
