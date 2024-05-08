import type { FC } from "react"

import { GoogleSigninButton } from "@react-native-google-signin/google-signin"

import { useAuthentication, useUser } from "../../shared/services/auth"
import { useThemeMode } from "../../shared/design/theme"
import Button from "../../shared/design/Button"
import Card from "../../shared/design/Card"
import Screen from "../../shared/design/Screen"
import Typography from "../../shared/design/Typography"
import FormSwitch from "../../shared/components/FormSwitch"

const Settings: FC = () => {
  const { signIn, signOut } = useAuthentication()
  const user = useUser()
  const { mode, setMode } = useThemeMode()

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
