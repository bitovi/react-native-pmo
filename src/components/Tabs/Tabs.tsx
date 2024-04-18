import type { FC } from "react"
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

  return (
    <Box style={styles.wrapper}>
      {options.map(({ value, label }) => {
        const isActive = value === activeTab

        return (
          <Pressable
            key={value}
            onPress={() => onChange(value)}
            style={{
              flex: 1,
              alignItems: "center",
              padding: theme.spacing.m,
              backgroundColor: isActive
                ? theme.colors.primary
                : theme.colors.background,
              borderColor: theme.colors.primary,
              borderWidth: 1,
            }}
          >
            <Typography
              variant="title"
              color={isActive ? "textLight" : "primary"}
            >
              {label}
            </Typography>
          </Pressable>
        )
      })}
    </Box>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
})

export default Tabs
