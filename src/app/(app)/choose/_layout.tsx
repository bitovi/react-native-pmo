import { Stack } from "expo-router"

import { useTheme } from "@shared/design/theme"

const ChooseLayout: React.FC = () => {
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: theme.palette.screen.main,
        },
        headerTitleStyle: {
          color: theme.palette.screen.contrast,
          ...theme.typography.title,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[state]/index" />
      <Stack.Screen name="[state]/[city]/index" />
    </Stack>
  )
}

export default ChooseLayout
