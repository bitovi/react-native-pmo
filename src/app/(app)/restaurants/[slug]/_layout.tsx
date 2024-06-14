import { Stack } from "expo-router"

const RestaurantLayout: React.FC = () => {
  // const { slug } = useLocalSearchParams()

  return (
    <Stack screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="order" />
    </Stack>
  )
}

export default RestaurantLayout
