import type { FC } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StaticScreenProps } from "@react-navigation/native"
import { useRestaurants } from "../../services/restaurant/hook"
import { Box, Loading, Press, Typography } from "../../components"

type Props = StaticScreenProps<{
  state: string
  city: string
}>

const RestaurantList: FC<Props> = ({ route }) => {
  const { state, city } = route.params
  const navigation = useNavigation()
  const { data, error, isPending } = useRestaurants(state, city)

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">
          Error loading restaurants: {"\n"}
        </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Box padding="s">
      <FlatList
        data={data}
        renderItem={({ item: restaurant }) => (
          <Press
            title={restaurant.name}
            onPress={() =>
              navigation.navigate("RestaurantDetails", {
                slug: restaurant.slug,
              })
            }
          ></Press>
        )}
        keyExtractor={(item) => item._id}
      />
    </Box>
  )
}

export default RestaurantList
