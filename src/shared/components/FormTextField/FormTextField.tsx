import { useId } from "react"
import { TextInput } from "react-native"

import Box from "../../design/Box"
import Typography from "../../design/Typography"
import { useTheme } from "../../design/theme"

export interface FormTextFieldProps {
  label: string
  placeholder?: string
  type?: "text"
  value: string
  onChange?: (value: string) => void
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  const id = useId()
  const theme = useTheme()

  return (
    <Box style={{ marginVertical: 8 }}>
      <Typography nativeID={id} variant="label">
        {label}
      </Typography>
      <TextInput
        accessibilityLabel="input"
        accessibilityLabelledBy={id}
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
