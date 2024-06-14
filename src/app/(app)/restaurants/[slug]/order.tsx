import { useLocalSearchParams } from "expo-router"
import { Text } from "react-native"

import Screen from "@shared/design/Screen"

const RestaurantOrderPage: React.FC = () => {
  const { slug } = useLocalSearchParams()

  return (
    <Screen title="Order from <Restaurant Name>">
      <Text>{slug}</Text>
    </Screen>
  )
}

export default RestaurantOrderPage
