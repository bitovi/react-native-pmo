import { render, screen } from "@testing-library/react-native"

import AuthProvider from "@shared/services/auth"

import Settings from "./Settings"

describe("Settings component", () => {
  it("renders Settings Page", async () => {
    render(
      <AuthProvider>
        <Settings />
      </AuthProvider>,
    )

    expect(screen.getByText(/Welcome back, name/i)).toBeOnTheScreen()
    // expect(screen.getByText(/Mock Sign in with Google/i)).toBeOnTheScreen()
  })
})
