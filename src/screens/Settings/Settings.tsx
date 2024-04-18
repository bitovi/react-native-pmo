import type { FC } from "react"
import { useEffect } from "react"

import { StyleSheet } from "react-native"
import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { useNetInfo } from "@react-native-community/netinfo"

import {
  useAuthenticated,
  useAuthentication,
  useUser,
} from "../../services/auth"
import useTheme from "../../theme/useTheme"
import Box from "../../components/Box"
import Press from "../../components/Press"
import Typography from "../../components/Typography"
import { useFavorites } from "../../services/pmo/favorite/hook"
import { FormSwitch } from "../../components/FormSwitch"
import Card from "../../components/Card"

const Settings: FC = () => {
  const isAuthenticated = useAuthenticated()
  const { signIn, signOut } = useAuthentication()
  const user = useUser()
  const { isConnected } = useNetInfo()
  const { syncWithServer, localFavorites } = useFavorites(user?.id)
  const { mode, setMode } = useTheme()

  useEffect(() => {
    if (user && isConnected && localFavorites) {
      syncWithServer()
    }
  }, [isConnected, localFavorites, syncWithServer, user])

  return (
    <Box padding="s" style={styles.container}>
      <Card padding="m">
        {isAuthenticated && (
          <>
            <Typography variant="heading">
              Welcome back, {user?.name}
            </Typography>
            <Press title="Sign Out" onPress={signOut} />
          </>
        )}
        {isAuthenticated === false && <GoogleSigninButton onPress={signIn} />}
      </Card>
      <Card padding="m">
        <FormSwitch
          label="Dark Mode"
          value={mode === "dark"}
          onChange={(value) => setMode(value ? "dark" : "light")}
        />
      </Card>
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

export default Settings
