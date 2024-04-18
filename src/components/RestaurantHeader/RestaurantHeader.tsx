import type { Restaurant } from "../../services/pmo/restaurant"
import { ImageBackground, StyleSheet } from "react-native"
import Typography from "../../design/Typography"
import Box from "../../design/Box"

const assetsUrl = process.env.PMO_ASSETS

type Props = {
  restaurant: Restaurant | null
}

const RestaurantHeader: React.FC<Props> = ({ restaurant }) => {
  return (
    <Box style={styles.restaurantHeader}>
      <ImageBackground
        style={styles.hero}
        source={{
          uri: `${assetsUrl}/${restaurant?.images.banner}`,
        }}
      >
        <Box padding="m" style={styles.heroTextContainer}>
          <Typography variant="heading" style={styles.heroText}>
            {restaurant?.name}
          </Typography>
        </Box>
      </ImageBackground>
      <Box padding="m" style={styles.info}>
        {restaurant?.address && (
          <Typography variant="body">
            {restaurant.address.street}
            {restaurant.address.city}, {restaurant.address.state}{" "}
            {restaurant.address.zip}
          </Typography>
        )}
        <Typography variant="body">
          $$$ Hours: M-F 10am-11pm Open Now
        </Typography>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  restaurantHeader: {
    marginBottom: 5,
  },
  hero: {
    width: "100%",
    maxWidth: 768,
    height: 180,
    margin: "auto",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  heroText: {
    color: "#ffffff",
    fontSize: 32,
  },
  heroTextContainer: {
    backgroundColor: "rgba(202, 47, 53, 0.8)",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: "auto",
  },
  info: {},
  background: {},
  address: {},
  hoursPrice: {},
  openNow: {},
})

export default RestaurantHeader
