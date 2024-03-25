import type { FC } from "react"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Image } from "react-native"
import { Box, Press, Typography } from "../../components"

const Home: FC = () => {
  const navigation = useNavigation()

  return (
    <Box style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `${"https://place-my-order.firebaseapp.com" || process.env.EXPO_PUBLIC_PMO_ASSETS}/node_modules/place-my-order-assets/images/homepage-hero.jpg`,
        }}
      />
      <Box padding="s">
        <Typography variant="heading">
          Ordering food has never been easier
        </Typography>
        <Typography variant="body">
          We make it easier than ever to order gourmet food from your favorite
          local restaurants.
        </Typography>
      </Box>
      <Box padding="s">
        <Press
          title="Choose a restaurant"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "StateListStack" }],
            })
          }
        />
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "flex-start",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
})

export default Home
