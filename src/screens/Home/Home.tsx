import type { FC } from "react"
import { useEffect } from "react"

import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Image } from "react-native"
import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { useNetInfo } from "@react-native-community/netinfo"

import {
  useAuthenticated,
  useAuthentication,
  useUser,
} from "../../services/auth"
import { Box, Press, Typography } from "../../components"
import { useFavorites } from "../../services/pmo/favorite/hook"

const assetsUrl = process.env.PMO_ASSETS

const Home: FC = () => {
  const navigation = useNavigation()
  const isAuthenticated = useAuthenticated()
  const { signIn, signOut } = useAuthentication()
  const user = useUser()
  const { isConnected } = useNetInfo()
  const { syncWithServer, localFavorites } = useFavorites(user?.id)

  useEffect(() => {
    if (user && isConnected && localFavorites) {
      syncWithServer()
    }
  }, [isConnected, localFavorites, syncWithServer, user])

  return (
    <Box style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `${assetsUrl}/node_modules/place-my-order-assets/images/homepage-hero.jpg`,
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

        {isAuthenticated && <Press title="Sign Out" onPress={signOut} />}
        {isAuthenticated === false && <GoogleSigninButton onPress={signIn} />}
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
