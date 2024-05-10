import { Suspense, lazy, useState } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"

import Loading from "../../shared/components/Loading"
import Tabs from "../../shared/components/Tabs"
import Box from "../../shared/design/Box"
import Button from "../../shared/design/Button"
import Screen from "../../shared/design/Screen"
import Typography from "../../shared/design/Typography"
import {
  City,
  State,
  useRestaurants,
} from "../../shared/services/pmo/restaurant"

import { RestaurantsStackParamList } from "../../App"

const Map = lazy(() => import("./components/Map"))

export interface RestaurantListParams {
  state: State
  city: City
}

export interface RestaurantListProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantList"> {}

const RestaurantList: React.FC<RestaurantListProps> = ({ route }) => {
  const navigation = useNavigation()

  const { state, city } = route.params
  const { data, error, isPending } = useRestaurants(state.short, city.name)

  const [tab, setTab] = useState<string>("list")

  const navigateToDetails = (slug: string) => {
    navigation.navigate("RestaurantDetails", {
      state,
      city,
      slug: slug,
    })
  }

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">Error loading restaurants: </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <>
      <Tabs
        options={[
          {
            label: "List",
            value: "list",
          },
          {
            label: "Map",
            value: "map",
          },
        ]}
        value={tab}
        onChange={setTab}
      />

      <Screen noScroll>
        {tab === "list" && (
          <Box padding="s">
            <FlatList
              data={data}
              renderItem={({ item: restaurant }) => (
                <Button onPress={() => navigateToDetails(restaurant.slug)}>
                  {restaurant.name}
                </Button>
              )}
              keyExtractor={(item) => item._id}
            />
          </Box>
        )}
        {tab === "map" && data && (
          <Suspense fallback={<Loading />}>
            <Map data={data} navigateTo={navigateToDetails} />
          </Suspense>
        )}
      </Screen>
    </>
  )
}

export default RestaurantList
