import type { FC } from "react"
import type { User } from "@react-native-google-signin/google-signin"

import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Image } from "react-native"
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin"
import { Box, Press, Typography } from "../../components"

const assetsUrl = process.env.PMO_ASSETS

const Home: FC = () => {
  const navigation = useNavigation()
  const [userInfo, setUserInfo] = useState<User | null>()

  async function handleSignIn() {
    try {
      const userInfo = await GoogleSignin.signIn()
      setUserInfo(userInfo)
    } catch (error) {
      setUserInfo(null)
      console.log("GoogleSignin.signIn() error", error)
    }
  }

  async function handleSignOut() {
    try {
      await GoogleSignin.signOut()
      setUserInfo(null)
    } catch (error) {
      console.log("GoogleSignin.signOut() error", error)
    }
  }

  useEffect(() => {
    async function run() {
      const userInfo = await GoogleSignin.getCurrentUser()
      setUserInfo(userInfo)
    }

    run()
  }, [])

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

        {/* if user === undefined, then we don't know yet. */}
        {userInfo === null && <GoogleSigninButton onPress={handleSignIn} />}
        {userInfo && <Press title="Sign Out" onPress={handleSignOut} />}
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
