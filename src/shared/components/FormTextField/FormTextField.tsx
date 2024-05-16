import { useId } from "react"
import { TextInput } from "react-native"

import Box from "../../design/Box"
import { useTheme } from "../../design/theme"
import Typography from "../../design/Typography"

export interface FormTextFieldProps {
  type?: "text"
  label: string
  hint?: string
  placeholder?: string
  value: string
  onChange?: (value: string) => void
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  label,
  hint,
  placeholder,
  value,
  onChange,
}) => {
  const theme = useTheme()
  const id = useId()

  return (
    <Box style={{ marginVertical: 8 }}>
      <Typography nativeID={id} variant="label">
        {label}
      </Typography>
      <TextInput
        accessibilityLabel={label}
        accessibilityLabelledBy={id}
        accessibilityHint={hint}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        style={{
          flex: 1,
          paddingVertical: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.palette.screen.contrast,
          color: theme.palette.screen.contrast,
        }}
      />
    </Box>
  )
}

export default FormTextField
