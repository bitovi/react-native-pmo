import { render, screen } from "@testing-library/react-native"

import AuthProvider from "@shared/services/auth"
import * as restaurantHooks from "@shared/services/pmo/restaurant/hooks"

import RestaurantDetails from "./RestaurantDetails"

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native")
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      setOptions: jest.fn(),
    }),
  }
})

const useRestaurant: jest.SpyInstance<
  ReturnType<typeof restaurantHooks.useRestaurant>
> = jest.spyOn(restaurantHooks, "useRestaurant")

describe("RestaurantDetails component", () => {
  const mockRestaurantData = {
    data: {
      _id: "1",
      name: "Test Restaurant",
      slug: "test-restaurant",
      images: {
        banner: "banner.jpg",
        owner: "owner.jpg",
        thumbnail: "thumbnail.jpg",
      },
      menu: {
        dinner: [{ name: "yum", price: 1 }],
        lunch: [{ name: "snack", price: 2 }],
      },
      coordinate: { latitude: 0, longitude: 0 },
    },
    isPending: false,
    error: undefined,
  }

  it("renders loading state", () => {
    useRestaurant.mockReturnValue({
      data: undefined,
      isPending: true,
      error: undefined,
    })
    render(
      <AuthProvider>
        <RestaurantDetails slug="test-restaurant" />
      </AuthProvider>,
    )

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })

  it("renders error state", () => {
    useRestaurant.mockReturnValue({
      data: undefined,
      isPending: false,
      error: { name: "Error", message: "Mock error" },
    })

    render(
      <AuthProvider>
        <RestaurantDetails slug="test-restaurant" />
      </AuthProvider>,
    )

    expect(
      screen.getByText(/Error loading restaurant details:/i, { exact: false }),
    ).toBeOnTheScreen()

    expect(screen.getByText(/Mock error/i)).toBeOnTheScreen()
  })

  it("renders the RestaurantHeader and content when data is available", () => {
    useRestaurant.mockReturnValue(mockRestaurantData)

    render(
      <AuthProvider>
        <RestaurantDetails slug="test-restaurant" />
      </AuthProvider>,
    )

    expect(screen.getByText("Test Restaurant")).toBeOnTheScreen()
  })

  it("renders the RestaurantHeader and content when data is not available", () => {
    useRestaurant.mockReturnValue({ ...mockRestaurantData, data: undefined })

    render(
      <AuthProvider>
        <RestaurantDetails slug="test-restaurant" />
      </AuthProvider>,
    )

    expect(screen.getByText("Place an order")).toBeOnTheScreen()
  })
})
