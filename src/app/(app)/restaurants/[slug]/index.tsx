import { Link, useLocalSearchParams } from "expo-router"

import Screen from "@shared/design/Screen"

const RestaurantPage: React.FC = () => {
  const { slug } = useLocalSearchParams()

  return (
    <Screen title="<Restaurant Name>">
      <Link href={`/restaurants/${slug}/order`}>Order</Link>
    </Screen>
  )
}

export default RestaurantPage
