import { Suspense, lazy, useState } from "react"

import Loading from "@shared/components/Loading"
import Tabs from "@shared/components/Tabs"
import Box from "@shared/design/Box"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"
import { useRestaurants } from "@shared/services/pmo/restaurant"

import List from "./components/List"

const Map = lazy(() => import("./components/Map"))

export interface RestaurantListProps {
  state: string
  city: string
}

const RestaurantList: React.FC<RestaurantListProps> = ({ state, city }) => {
  const { data: restaurants, error, isPending } = useRestaurants(state, city)

  const [tab, setTab] = useState<string>("list")

  if (isPending) {
    return (
      <Screen title="Choose a Restaurant">
        <Loading />
      </Screen>
    )
  }

  if (error || !restaurants) {
    return (
      <Screen title="Choose a Restaurant">
        <Box padding="s">
          <Typography variant="heading">Error loading restaurants</Typography>
          {error && <Typography variant="body">{error.message}</Typography>}
        </Box>
      </Screen>
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

      <Screen noScroll title="Choose a Restaurant">
        {tab === "list" && <List restaurants={restaurants} />}
        {tab === "map" && (
          <Suspense fallback={<Loading />}>
            <Map restaurants={restaurants} />
          </Suspense>
        )}
      </Screen>
    </>
  )
}

export default RestaurantList
