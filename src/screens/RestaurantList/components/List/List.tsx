import { FlatList } from "react-native"

import Box from "@shared/design/Box"
import Button from "@shared/design/Button"
import { Restaurant } from "@shared/services/pmo/restaurant"

export interface ListProps {
  data: Restaurant[]
}

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <Box padding="s">
      <FlatList
        data={data}
        renderItem={({ item: restaurant }) => (
          <Button href={`/restaurants/${restaurant.slug}`}>
            {restaurant.name}
          </Button>
        )}
        keyExtractor={(item) => item._id}
      />
    </Box>
  )
}

export default List
