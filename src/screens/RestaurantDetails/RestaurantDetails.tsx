import type { FC } from "react"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import RestaurantHeader from "../../components/RestaurantHeader"
import type { StaticScreenProps } from "@react-navigation/native"
import { Box, Press, Typography } from "../../components"
import { useRestaurant } from "../../services/restaurant/hook"

type Props = StaticScreenProps<{
  slug: string
}>

const RestaurantDetails: FC<Props> = ({ route }) => {
  const { slug } = route.params
  const navigation = useNavigation()
  const { data: restaurant, error, isPending } = useRestaurant(slug)

  if (error) {
    return (
      <Box padding="s" style={styles.container}>
        <Typography variant="heading">
          Error loading restaurant details: {"\n"}
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
    <Box style={styles.container}>
      <RestaurantHeader restaurant={restaurant} />
      <Press
        title="Place an order"
        onPress={() => {
          navigation.navigate("OrderCreate", { restaurantId: slug })
        }}
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default RestaurantDetails
