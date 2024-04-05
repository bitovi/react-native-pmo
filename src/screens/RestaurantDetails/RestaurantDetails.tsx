import type { FC } from "react"
import { useEffect } from "react"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import RestaurantHeader from "../../components/RestaurantHeader"
import type { StaticScreenProps } from "@react-navigation/native"
import { Box, Loading, Press, Typography } from "../../components"
import { useRestaurant } from "../../services/pmo/restaurant"
import { useFavorites } from "../../services/pmo/favorite"
import { useAuthContext } from "../../services/auth/context"

export type Props = StaticScreenProps<{
  slug: string
}>

const RestaurantDetails: FC<Props> = ({ route }) => {
  const { slug } = route.params
  const navigation = useNavigation()
  const { data: restaurant, error, isPending } = useRestaurant(slug)
  const { isAuthenticated, user, signIn } = useAuthContext()
  const { updateFavorites, favorite } = useFavorites(user?.id, restaurant?._id)

  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({ title: `${restaurant.name}` })
    }
  }, [restaurant, navigation])

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
    return <Loading />
  }

  return (
    <Box style={styles.container}>
      <RestaurantHeader restaurant={restaurant} />
      <Press
        title={
          isAuthenticated && favorite?.favorite
            ? "Remove from Favorites"
            : "Add to favorites"
        }
        onPress={() => {
          if (isAuthenticated) {
            updateFavorites(restaurant!._id)
          } else {
            signIn()
          }
        }}
      ></Press>
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
  container: {},
})

export default RestaurantDetails
