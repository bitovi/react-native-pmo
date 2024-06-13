import { FlatList } from "react-native"

import Box from "../../../../shared/design/Box"
import Button from "../../../../shared/design/Button"
import { Restaurant } from "../../../../shared/services/pmo/restaurant"

export interface ListProps {
  data: Restaurant[]
  navigateToRestaurant: (slug: string) => void
}

const List: React.FC<ListProps> = ({ data, navigateToRestaurant }) => {
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

export default List
