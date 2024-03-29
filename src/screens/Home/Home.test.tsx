import { render, screen } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"

import Home from "./Home"

describe("Home component", () => {
  it("renders Home Page", async () => {
    render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>,
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
