import { Stack } from "expo-router"

const ChooseLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[slug]" />
    </Stack>
  )
}

export default ChooseLayout
