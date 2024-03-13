import type { FC } from "react"
import { FlatList, StyleSheet } from "react-native"
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
      <Box padding="s" style={styles.container}>
        <Typography variant="heading">
          Error loading restaurants: {"\n"}
        </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return (
      <Box padding="s" style={styles.container}>
        <Typography variant="heading">Loading…</Typography>
      </Box>
    )
  }

  return (
    <Box padding="s" style={styles.container}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf",
    alignItems: "flex-start",
    overflow: "scroll",
  },
  options: {
    flexDirection: "row",
  },
})

export default RestaurantList
