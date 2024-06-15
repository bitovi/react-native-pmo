import { FlatList } from "react-native"

import Box from "@shared/design/Box"
import LinkButton from "@shared/design/LinkButton"
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
