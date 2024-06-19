import { useRouter } from "expo-router"
import MapView, { Marker } from "react-native-maps"

import { Restaurant } from "@shared/services/pmo/restaurant"

export interface MapProps {
  restaurants: Restaurant[]
}

const Map: React.FC<MapProps> = ({ restaurants }) => {
  const router = useRouter()

  return (
    <MapView
      style={{ minHeight: "100%" }}
      initialRegion={{
        ...restaurants[0].coordinate,
        latitudeDelta: 0.27,
        longitudeDelta: 0.5,
      }}
      loadingEnabled
    >
      {restaurants.map((restaurant, index) => (
        <Marker
          key={index}
          coordinate={restaurant.coordinate}
          title={restaurant.name}
          description={restaurant.address?.street}
          onCalloutPress={() =>
            router.navigate(`/restaurants/${restaurant.slug}`)
          }
        />
      ))}
    </MapView>
  )
}

export default Map
