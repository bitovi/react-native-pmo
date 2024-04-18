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
import { useThemeMode } from "../../design/theme"
import Box from "../../design/Box"
import Button from "../../design/Button"
import Typography from "../../design/Typography"
import { useFavorites } from "../../services/pmo/favorite"
import FormSwitch from "../../components/FormSwitch"
import Card from "../../design/Card"

const Settings: FC = () => {
  const isAuthenticated = useAuthenticated()
  const { signIn, signOut } = useAuthentication()
  const user = useUser()
  const { isConnected } = useNetInfo()
  const { syncWithServer, localFavorites } = useFavorites(user?.id)
  const { mode, setMode } = useThemeMode()

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
            <Button title="Sign Out" onPress={signOut} />
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
