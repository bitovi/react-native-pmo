import type { FC } from "react"
import { FlatList, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import ListItem from "../../components/ListItem/ListItem"
import { useCities, useRestaurants, useStates } from "../../services/restaurant/hook"
import { Box, Typography } from "../../components"

type Props = {
  city: string
  state: string
}

const RestaurantList: FC<Props> = ({ city, state }) => {
  const { data, error, isPending } = useRestaurants(state, city)
  const navigation = useNavigation()

  if (error) {
    return (
      <Box style={styles.container}>
        <Text>Error: {error.message}</Text>
      </Box>
    )
  }

  if (isPending) {
    return (
      <Box style={styles.container}>
        <Text>Loading...</Text>
      </Box>
    )
  }

  return (
    <Box style={styles.container}>
      <Typography variant="h2">Restaurant List:</Typography>
      <FlatList
        data={data}
        renderItem={({ item: restaurant }) => (
          <ListItem
            image={restaurant.images.thumbnail}
            onPress={() => navigation.navigate("RestaurantDetails", { slug: restaurant.slug })}
          >
            <Text>{restaurant.name}</Text>
          </ListItem>
        )}
        style={styles.list}
        keyExtractor={(item) => item._id}
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fdf",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    maxHeight: 200,
  },
})

export default RestaurantList
