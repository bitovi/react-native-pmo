import { useLocalSearchParams } from "expo-router"

import RestaurantList from "@screens/RestaurantList"

const RestaurantsPage: React.FC = () => {
  const { state, city } = useLocalSearchParams()

  return <RestaurantList state={state as string} city={city as string} />
}

export default RestaurantsPage
