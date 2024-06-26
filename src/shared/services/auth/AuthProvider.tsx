import {
  User as UserInfo,
  GoogleSignin,
} from "@react-native-google-signin/google-signin"
import { useCallback, useEffect, useMemo, useState } from "react"

import { AuthContext, AuthContextProvider, useAuthContext } from "./context"

const googleOauthWebClientId =
  process.env.EXPO_PUBLIC_GOOGLE_OAUTH_WEB_CLIENT_ID
const googleOauthIosClientId =
  process.env.EXPO_PUBLIC_GOOGLE_OAUTH_IOS_CLIENT_ID
GoogleSignin.configure({
  scopes: ["openid", "profile", "email"],
  webClientId: googleOauthWebClientId,
  iosClientId: googleOauthIosClientId,
})

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>()

  const signIn = useCallback(async () => {
    try {
      const userInfo = await GoogleSignin.signIn()
      setUserInfo(userInfo)
      return userInfo.user
    } catch (error) {
      setUserInfo(null)
      console.error("GoogleSignin.signIn() error", error)
      return false
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      await GoogleSignin.signOut()
      setUserInfo(null)
      return true
    } catch (error) {
      console.error("GoogleSignin.signOut() error", error)
      return false
    }
  }, [])

  useEffect(() => {
    async function run() {
      const userInfo = await GoogleSignin.getCurrentUser()
      setUserInfo(userInfo)
    }

    run()
  }, [])

  const value = useMemo<AuthContext>(
    () => ({
      signIn,
      signOut,
      isAuthenticated: userInfo ? true : userInfo === null ? false : undefined,
      user: userInfo?.user,
      scopes: userInfo?.scopes,
      idToken: userInfo?.idToken,
    }),
    [signIn, signOut, userInfo],
  )

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>
}

export default AuthProvider

export function useAuthentication(): Pick<AuthContext, "signIn" | "signOut"> {
  const { signIn, signOut } = useAuthContext()

  return { signIn, signOut }
}

export function useAuthenticated(): boolean | undefined {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated
}

export function useUser(): UserInfo["user"] | undefined {
  const { user } = useAuthContext()

  return user
}
