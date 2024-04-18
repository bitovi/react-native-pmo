import type { FC, ReactNode } from "react"
import { StyleSheet, Switch } from "react-native"
import Box from "../../design/Box"
import Typography from "../../design/Typography"
import { useTheme } from "../../design/theme"

type Props = {
  label: ReactNode
  value: boolean
  onChange: (value: boolean) => void
}

const FormSwitch: FC<Props> = ({ label, value, onChange }) => {
  const { theme } = useTheme()

  return (
    <Box style={styles.wrapper}>
      <Typography variant="label">{label}</Typography>
      <Switch
        onValueChange={onChange}
        value={value}
        thumbColor={theme.colors.textLight}
        trackColor={{
          true: theme.colors.success,
          false: theme.colors.border,
        }}
      ></Switch>
    </Box>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
})

export default FormSwitch
