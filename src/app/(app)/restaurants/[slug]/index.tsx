import { useLocalSearchParams } from "expo-router"

import RestaurantDetails from "@screens/RestaurantDetails"

const RestaurantPage: React.FC = () => {
  const { slug } = useLocalSearchParams()

  return <RestaurantDetails slug={slug as string} />
}

export default RestaurantPage
