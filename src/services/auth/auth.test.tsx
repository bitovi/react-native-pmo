import type { FC } from "react"
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react-native"
import AuthProvider, {
  useAuthenticated,
  useAuthentication,
  useUser,
} from "./auth"

import { View, Text } from "react-native"
import { Press } from "../../components"
import { GoogleSigninButton } from "@react-native-google-signin/google-signin"

// Mocking the global fetch function
const mockFetch = jest.fn()

global.fetch = mockFetch

beforeEach(() => {
  mockFetch.mockClear()
})

afterEach(() => {
  mockFetch.mockClear()
})

describe("AuthProvider provider", () => {
  const TestComponent: FC = () => {
    const isAuthenticated = useAuthenticated()
    const { signIn, signOut } = useAuthentication()
    const user = useUser()

    return (
      <View>
        <Text>{user?.id}</Text>
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
        <Text>{user?.photo}</Text>
        <Text>{user?.givenName}</Text>
        <Text>{user?.familyName}</Text>
        {isAuthenticated && <Press title="Sign Out" onPress={signOut} />}
        {isAuthenticated === false && <GoogleSigninButton onPress={signIn} />}
      </View>
    )
  }
  it("renders with provider; signs in and signs out", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText(/mockId/i)).toBeOnTheScreen()
    })
    fireEvent.press(screen.getByText(/Sign Out/i))
    await waitFor(() => {
      expect(screen.getByText(/Mock Sign in with Google/i)).toBeOnTheScreen()
    })
    fireEvent.press(screen.getByText(/Mock Sign in with Google/i))
    await waitFor(() => {
      expect(screen.getByText(/Sign Out/i)).toBeOnTheScreen()
    })
  })
})
