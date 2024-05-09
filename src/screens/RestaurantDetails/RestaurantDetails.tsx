import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"

import Loading from "../../shared/components/Loading"
import RestaurantHeader from "../../shared/components/RestaurantHeader"
import Button from "../../shared/design/Button"
import Screen from "../../shared/design/Screen"
import Typography from "../../shared/design/Typography"
import {
  useAuthenticated,
  useUser,
  useAuthentication,
} from "../../shared/services/auth"
import { useFavorites } from "../../shared/services/pmo/favorite"
import { useRestaurant } from "../../shared/services/pmo/restaurant"

import { RestaurantsStackParamList } from "../../App"

export interface RestaurantDetailsProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantDetails"> {}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ route }) => {
  const { slug } = route.params
  const navigation = useNavigation()
  const { data: restaurant, error, isPending } = useRestaurant(slug)
  const isAuthenticated = useAuthenticated()
  const user = useUser()
  const { signIn } = useAuthentication()
  const { updateFavorites, favorite } = useFavorites(user?.id, restaurant?._id)
  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({ title: `${restaurant.name}` })
    }
  }, [restaurant, navigation])

  if (error) {
    return (
      <Screen>
        <Typography variant="heading">
          Error loading restaurant details:{" "}
        </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Screen>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Screen>
      <RestaurantHeader restaurant={restaurant} />
      <Button
        onPress={() => {
          if (isAuthenticated) {
            updateFavorites(restaurant!._id)
          } else {
            signIn()
          }
        }}
      >
        {isAuthenticated && favorite?.favorite
          ? "Remove from Favorites"
          : "Add to favorites"}
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("OrderCreate", { slug: slug })
        }}
      >
        Place an order
      </Button>
    </Screen>
  )
}

export default RestaurantDetails
