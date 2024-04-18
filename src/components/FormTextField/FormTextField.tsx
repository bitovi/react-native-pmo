import type { FC } from "react"
import { Text, TextInput } from "react-native"
import Box from "../../design/Box"
import { useTheme } from "../../design/theme"

type Props = {
  label: string
  placeholder?: string
  type?: "text"
  value: string
  onChange?: (value: string) => void
}

const FormTextField: FC<Props> = ({ label, placeholder, value, onChange }) => {
  const { theme } = useTheme()

  return (
    <Box style={{ marginVertical: 8 }}>
      <Text nativeID="formLabel" style={{ fontSize: 10, fontWeight: "500" }}>
        {label}
      </Text>
      <TextInput
        accessibilityLabel="input"
        accessibilityLabelledBy="formLabel"
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          paddingVertical: 0,
        }}
      />
    </Box>
  )
}

export default FormTextField
