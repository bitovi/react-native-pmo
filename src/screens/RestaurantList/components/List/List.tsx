import { FlatList } from "react-native"

import Box from "../../../../shared/design/Box"
import Button from "../../../../shared/design/Button"
import { Restaurant } from "../../../../shared/services/pmo/restaurant"

export interface RestaurantListProps {
  data: Restaurant[]
  navigateToRestaurant: (slug: string) => void
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  data,
  navigateToRestaurant,
}) => {
  return (
    <Box padding="s">
      <FlatList
        data={data}
        renderItem={({ item: restaurant }) => (
          <Button onPress={() => navigateToRestaurant(restaurant.slug)}>
            {restaurant.name}
          </Button>
        )}
        keyExtractor={(item) => item._id}
      />
    </Box>
  )
}

export default RestaurantList
