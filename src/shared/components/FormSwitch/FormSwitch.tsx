import { useId } from "react"
import { Switch } from "react-native"

import Box from "../../design/Box"
import { useTheme } from "../../design/theme"
import Typography from "../../design/Typography"

export interface FormSwitchProps {
  label: string
  hint?: string
  value: boolean
  onChange: (value: boolean) => void
}

const FormSwitch: React.FC<FormSwitchProps> = ({
  label,
  hint,
  value,
  onChange,
}) => {
  const { palette } = useTheme()
  const id = useId()

  return (
    <Box
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      <Typography nativeID={id} variant="label">
        {label}
      </Typography>
      <Switch
        accessibilityLabel={label}
        accessibilityLabelledBy={id}
        accessibilityHint={hint}
        onValueChange={onChange}
        value={value}
        thumbColor={palette.primary.contrast}
        trackColor={{
          true: palette.primary.strong,
          false: palette.screen.soft,
        }}
      ></Switch>
    </Box>
  )
}

export default FormSwitch
