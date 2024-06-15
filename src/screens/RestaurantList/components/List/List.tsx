import { FlatList } from "react-native"

import Box from "@shared/design/Box"
import LinkButton from "@shared/design/LinkButton"
import { Restaurant } from "@shared/services/pmo/restaurant"

export interface ListProps {
  restaurants: Restaurant[]
}

const List: React.FC<ListProps> = ({ restaurants }) => {
  return (
    <Box padding="s">
      <FlatList
        data={restaurants}
        renderItem={({ item: restaurant }) => (
          <LinkButton href={`/restaurants/${restaurant.slug}`}>
            {restaurant.name}
          </LinkButton>
        )}
        keyExtractor={(item) => item._id}
      />
    </Box>
  )
}

export default List
