import type { FC } from "react"
import { useState } from "react"
import { FlatList, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StaticScreenProps } from "@react-navigation/native"
import { useRestaurants } from "../../services/pmo/restaurant"
import { Box, Loading, Press, Typography } from "../../components"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

const styles = StyleSheet.create({
  topNav: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  activeButton: {
    margin: 0,
    marginRight: 1,
    minWidth: "46%",
    textAlign: "center",
    borderRadius: 0,
    backgroundColor: "black",
  },
  viewButton: {
    margin: 0,
    marginRight: 1,
    minWidth: "46%",
    textAlign: "center",
    borderRadius: 0,
    backgroundColor: "white",
    color: "black",
  },
  mapView: { minHeight: "100%" }, // needs a minHeight to display without error
})

type Props = StaticScreenProps<{
  state: string
  city: string
}>

const RestaurantList: FC<Props> = ({ route }) => {
  const navigation = useNavigation()

  const { state, city } = route.params
  const { data, error, isPending } = useRestaurants(state, city)

  const [tab, setTab] = useState<string>("list")

  const changeView = (view: string) => setTab(view)

  const navigateToDetails = (slug: string) => {
    navigation.navigate("RestaurantDetails", {
      slug: slug,
    })
  }

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">
          Error loading restaurants: {"\n"}
        </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <>
      <Box style={styles.topNav}>
        <Press
          title="List"
          style={tab === "list" ? styles.activeButton : styles.viewButton}
          onPress={() => changeView("list")}
        />
        <Press
          title="Map"
          style={tab === "map" ? styles.activeButton : styles.viewButton}
          onPress={() => changeView("map")}
        />
      </Box>
      {tab === "list" && (
        <Box padding="s">
          <FlatList
            data={data}
            renderItem={({ item: restaurant }) => (
              <Press
                title={restaurant.name}
                onPress={() => navigateToDetails(restaurant.slug)}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </Box>
      )}
      {tab === "map" && data && (
        <MapView
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            ...data[0].coordinate,
            latitudeDelta: 0.27,
            longitudeDelta: 0.5,
          }}
          loadingEnabled
        >
          {data?.map((restaurant, index) => (
            <Marker
              key={index}
              coordinate={restaurant.coordinate}
              title={restaurant.name}
              description={restaurant.address?.street}
              onCalloutPress={() => navigateToDetails(restaurant.slug)}
            />
          ))}
        </MapView>
      )}
    </>
  )
}

export default RestaurantList
