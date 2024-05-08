import type { FC } from "react"
import type { TextStyle, ViewStyle } from "react-native"
import type { Theme } from "../../design/theme"

import Box from "../../design/Box"
import { Pressable, StyleSheet } from "react-native"
import Typography from "../../design/Typography"
import { useTheme } from "../../design/theme"

type Props = {
  options: Array<{
    label: string
    value: string
  }>
  value: string
  onChange: (value: string) => void
}

const Tabs: FC<Props> = ({ options, value: activeTab, onChange }) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <Box style={styles.wrapper}>
      {options.map(({ value, label }) => {
        const isActive = value === activeTab

        return (
          <Pressable
            key={value}
            onPress={() => onChange(value)}
            style={StyleSheet.compose(styles.tab, isActive && styles.activeTab)}
          >
            <Typography
              variant="title"
              style={StyleSheet.compose(
                styles.tabText,
                isActive && styles.activeTabText,
              )}
            >
              {label}
            </Typography>
          </Pressable>
        )
      })}
    </Box>
  )
}

export default Tabs

function getStyles(theme: Theme): {
  wrapper: ViewStyle
  tab: ViewStyle
  tabText: TextStyle
  activeTab: ViewStyle
  activeTabText: TextStyle
} {
  return StyleSheet.create({
    wrapper: {
      flexDirection: "row",
    },
    tab: {
      flex: 1,
      alignItems: "center",
      padding: theme.spacing.m,
      borderWidth: 1,

      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.screen.main,
    },
    tabText: {
      color: theme.palette.screen.contrast,
    },
    activeTab: {
      backgroundColor: theme.palette.primary.main,
    },
    activeTabText: {
      color: theme.palette.primary.contrast,
    },
  })
}
