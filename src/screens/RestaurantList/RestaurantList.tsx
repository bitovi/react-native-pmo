import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { Suspense, lazy, useState } from "react"

import { RestaurantsStackParamList } from "../../App"
import Loading from "../../shared/components/Loading"
import Tabs from "../../shared/components/Tabs"
import Box from "../../shared/design/Box"
import Screen from "../../shared/design/Screen"
import Typography from "../../shared/design/Typography"
import {
  City,
  State,
  useRestaurants,
} from "../../shared/services/pmo/restaurant"

import List from "./components/List"

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

  if (isPending) {
    return <Loading />
  }

  if (error || !data) {
    return (
      <Box padding="s">
        <Typography variant="heading">Error loading restaurants</Typography>
        {error && <Typography variant="body">{error.message}</Typography>}
      </Box>
    )
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
          <List data={data} navigateToRestaurant={navigateToDetails} />
        )}
        {tab === "map" && data && (
          <Suspense fallback={<Loading />}>
            <Map data={data} navigateToRestaurant={navigateToDetails} />
          </Suspense>
        )}
      </Screen>
    </>
  )
}

export default RestaurantList
