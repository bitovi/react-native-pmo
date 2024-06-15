import Loading from "@shared/components/Loading"
import RestaurantHeader from "@shared/components/RestaurantHeader"
import Button from "@shared/design/Button"
import LinkButton from "@shared/design/LinkButton"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"
import { useUser, useAuthentication } from "@shared/services/auth"
import { useFavorites } from "@shared/services/pmo/favorite"
import { useRestaurant } from "@shared/services/pmo/restaurant"

export interface RestaurantDetailsProps {
  slug: string
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ slug }) => {
  const user = useUser()
  const { signIn } = useAuthentication()

  const { data: restaurant, error, isPending } = useRestaurant(slug)
  const { updateFavorites, favorite } = useFavorites(user?.id, restaurant?._id)

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
    <>
      <RestaurantHeader restaurant={restaurant} />

      <Screen title={`${restaurant?.name}`}>
        <Button
          onPress={() => {
            if (user) {
              updateFavorites(restaurant!._id)
            } else {
              signIn()
            }
          }}
        >
          {user && favorite?.favorite
            ? "Remove from Favorites"
            : "Add to favorites"}
        </Button>

        <LinkButton href={`/restaurants/${slug}/order`}>
          Place an order
        </LinkButton>
      </Screen>
    </>
  )
}

export default RestaurantDetails
