import { Link, useLocalSearchParams } from "expo-router"
import { Text } from "react-native"

import Screen from "@shared/design/Screen"

const RestaurantsPage: React.FC = () => {
  const { state, city } = useLocalSearchParams()

  return (
    <Screen title="Choose a Restaurant">
      <Text>
        Restaurants in {city}, {state}
      </Text>
      <Link href={`/restaurants/poutine-palace`}>Poutine Place</Link>
    </Screen>
  )
}

export default RestaurantsPage
