import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

import { Restaurant } from "../../../../shared/services/pmo/restaurant"

export interface MapProps {
  data: Restaurant[]
  navigateTo: (slug: string) => void
}

const Map: React.FC<MapProps> = ({ data, navigateTo }) => {
  return (
    <MapView
      // needs a minHeight to display without error
      style={{ minHeight: "100%" }}
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

export default Map
