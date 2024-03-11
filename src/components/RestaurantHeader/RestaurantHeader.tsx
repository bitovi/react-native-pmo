import type { Restaurant } from "../../services/restaurant"

import { ImageBackground, StyleSheet, View, Text } from "react-native"
import Typography from "../Typography"

const RestaurantHeader: React.FC<{ restaurant: Restaurant }> = ({
  restaurant,
}) => {
  return (
    <View style={styles.restaurantHeader}>
      <ImageBackground source={{ uri: `url(/${restaurant.images.banner})` }}>
        <View style={styles.background}></View>
        <Typography variant="heading">{restaurant.name}</Typography>
        {restaurant.address && (
          <Text style={styles.address}>
            {restaurant.address.street}
            {"\n"}
            {restaurant.address.city}, {restaurant.address.state}{" "}
            {restaurant.address.zip}
          </Text>
        )}

        <Text style={styles.hoursPrice}>
          $$$
          {"\n"}
          Hours: M-F 10am-11pm
          <Text style={styles.openNow}>Open Now</Text>
        </Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  restaurantHeader: {
    width: "100%",
    maxWidth: 768,
    margin: "auto",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#eeeeee",
    padding: 15,
    marginBottom: 15,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: -1 },
    textShadowRadius: 0,
  },
  background: {},
  address: {},
  hoursPrice: {},
  openNow: {},
})

export default RestaurantHeader
