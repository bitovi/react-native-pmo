import { Stack } from "expo-router"

const RootLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  )
}

export default RootLayout
