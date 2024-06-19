import { useLocalSearchParams } from "expo-router"

import RestaurantOrder from "@screens/RestaurantOrder"

const RestaurantOrderPage: React.FC = () => {
  const { slug } = useLocalSearchParams()

  return <RestaurantOrder slug={slug as string} />
}

export default RestaurantOrderPage
