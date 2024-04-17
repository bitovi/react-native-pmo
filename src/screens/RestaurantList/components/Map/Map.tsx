import type { FC } from "react"
import { StyleSheet } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import type { Restaurant } from "../../../../services/pmo/restaurant"

type Props = {
  data: Restaurant[]
  navigateTo: (slug: string) => void
}

const Map: FC<Props> = ({ data, navigateTo }) => {
  return (
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
          onCalloutPress={() => navigateTo(restaurant.slug)}
        />
      ))}
    </MapView>
  )
}

const styles = StyleSheet.create({
  mapView: { minHeight: "100%" }, // needs a minHeight to display without error
})

export default Map