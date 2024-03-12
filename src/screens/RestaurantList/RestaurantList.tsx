import type { FC } from "react"

import { FlatList, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StaticScreenProps } from "@react-navigation/native"
import { useRestaurants } from "../../services/restaurant/hook"
import { Box, Press, Typography } from "../../components"

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
    <Box padding="m" style={styles.container}>
      <Typography variant="heading">
        Restaurants in {city}, {state}
      </Typography>
      <Box fullWidth padding="m">
        <Typography variant="body">Restaurants:</Typography>
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
          style={styles.options}
          keyExtractor={(item) => item._id}
        />
      </Box>
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
    overflow: "scroll",
  },
  options: {
    flexDirection: "row",
  },
})

export default RestaurantList
