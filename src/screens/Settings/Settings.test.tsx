import { render, screen } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"

import AuthProvider from "../../shared/services/auth"

import Settings from "./Settings"

describe("Settings component", () => {
  it("renders Settings Page", async () => {
    render(
      <AuthProvider>
        <NavigationContainer>
          <Settings />
        </NavigationContainer>
      </AuthProvider>,
    )

    expect(screen.getByText(/dark mode/i)).toBeOnTheScreen()
  })
})
