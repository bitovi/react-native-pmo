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
  const [error, setError] = useState<Error | undefined>()
  const [isPending, setIsPending] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<UserInfo | null>()

  const signIn = useCallback(async () => {
    try {
      setError(undefined)
      setIsPending(true)
      const userInfo = await GoogleSignin.signIn()
      setIsPending(false)
      setUserInfo(userInfo)
      return userInfo.user
    } catch (error) {
      setUserInfo(null)
      console.error("GoogleSignin.signIn() error", error)
      setError(error as Error)
      setIsPending(false)
      setUserInfo(null)
      return false
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      setError(undefined)
      setIsPending(true)

      await GoogleSignin.signOut()
      setIsPending(false)
      setUserInfo(null)

      return true
    } catch (error) {
      console.error("GoogleSignin.signOut() error", error)
      setError(error as Error)

      return false
    }
  }, [])

  useEffect(() => {
    async function run() {
      try {
        setError(undefined)
        setIsPending(true)

        const userInfo = await GoogleSignin.getCurrentUser()

        setIsPending(false)
        setUserInfo(userInfo || undefined)
      } catch (error) {
        console.error(
          "Call to GoogleSignin.getCurrentUser() failed with error:",
          error,
        )

        setError(error as Error)
        setIsPending(false)
      }
    }

    run()
  }, [])

  const value = useMemo<AuthContext>(
    () => ({
      signIn,
      signOut,
      error,
      isAuthenticated: userInfo ? true : userInfo === null ? false : undefined,
      isPending,
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
