import type { FC } from "react"
import { useEffect } from "react"

import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { useNetInfo } from "@react-native-community/netinfo"

import { useAuthentication, useUser } from "../../services/auth"
import { useThemeMode } from "../../design/theme"
import Screen from "../../design/Screen"
import Button from "../../design/Button"
import Typography from "../../design/Typography"
import { useFavorites } from "../../services/pmo/favorite"
import FormSwitch from "../../components/FormSwitch"
import Card from "../../design/Card"

const Settings: FC = () => {
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
    <Screen>
      <Card>
        {user ? (
          <>
            <Typography variant="heading">Welcome back, {user.name}</Typography>
            <Button onPress={signOut}>Sign Out</Button>
          </>
        ) : (
          <GoogleSigninButton onPress={signIn} style={{ width: "100%" }} />
        )}
      </Card>

      <Card>
        <FormSwitch
          label="Dark Mode"
          value={mode === "dark"}
          onChange={(value) => setMode(value ? "dark" : "light")}
        />
      </Card>
    </Screen>
  )
}

export default Settings
