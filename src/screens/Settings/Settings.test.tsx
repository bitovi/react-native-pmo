import { render, screen } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"

import AuthProvider from "../../services/auth"

import Settings from "./Settings"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)
jest.mock("@react-native-community/netinfo", () => ({
  fetch: jest.fn(),
  isConnected: {
    fetch: jest.fn(),
  },
  isInternetReachable: jest.fn(),
  useNetInfo: () => ({ isConnected: true }),
}))

describe("Settings component", () => {
  it("renders Settings Page", async () => {
    render(
      <AuthProvider>
        <NavigationContainer>
          <Settings />
        </NavigationContainer>
      </AuthProvider>,
    )
    expect(
      screen.getByText(/Ordering food has never been easier/i),
    ).toBeOnTheScreen()
    expect(
      screen.getByText(
        /We make it easier than ever to order gourmet food from your favorite local restaurants./i,
      ),
    ).toBeOnTheScreen()
    expect(screen.getByText(/Choose a restaurant/i)).toBeOnTheScreen()
  })
})
