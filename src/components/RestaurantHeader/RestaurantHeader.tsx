import type { Restaurant } from "../../services/restaurant";

import { ImageBackground, StyleSheet, View, Text } from "react-native";
import Typography from "../Typography";

import { ImageBackground, StyleSheet, View } from "react-native";
import Typography from "../Typography";

type Props = {
  restaurant: Restaurant | null;
};

const RestaurantHeader: React.FC<Props> = ({ restaurant }) => {
  return (
    <View style={styles.restaurantHeader}>
      <ImageBackground
        source={{
          uri: `${process.env.EXPO_PUBLIC_PMO_ASSETS}/${restaurant?.images.banner}`,
        }}
      >
        <View style={styles.background}></View>
        <Typography color="background" variant="heading">
          {restaurant?.name}
        </Typography>
        {restaurant?.address && (
          <Typography color="background" variant="body">
            {restaurant.address.street}
            {"\n"}
            {restaurant.address.city}, {restaurant.address.state}{" "}
            {restaurant.address.zip}
          </Typography>
        )}
        <Typography color="background" variant="body">
          $$$
          {"\n"}
          Hours: M-F 10am-11pm {"\n"}Open Now
        </Typography>
      </ImageBackground>
    </View>
  );
};

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
});

export default RestaurantHeader;
