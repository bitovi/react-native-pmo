import type { FC } from "react"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Image } from "react-native"
import { Box, Press, Typography } from "../../components"

const Home: FC = () => {
  const navigation = useNavigation()

  return (
    <Box padding={"s"} style={styles.container}>
      <Image
        style={styles.image}
        source={require("place-my-order-assets/images/homepage-hero.jpg")}
      />
      <Typography variant="heading">
        Ordering food has never been easier
      </Typography>
      <Typography variant="body">
        We make it easier than ever to order gourmet food from your favorite
        local restaurants.
      </Typography>
      <Press
        title="Choose a restaurant"
        onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: 'StateListStack' }],
        })}
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  image: { width: 350, height: 400 },
})

export default Home
