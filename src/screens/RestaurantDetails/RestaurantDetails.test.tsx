import { render, screen } from "@testing-library/react-native"
import * as hook from "../../services/restaurant/hook"
import RestaurantDetails from "./RestaurantDetails"
import { NavigationContainer } from "@react-navigation/native"

describe("RestaurantDetails component", () => {
  // Mock the hooks and components used in RestaurantDetails

  let useRestaurant: jest.SpyInstance<ReturnType<typeof hook.useRestaurant>>
  beforeEach(() => {
    jest.resetAllMocks()
    useRestaurant = jest.spyOn(hook, "useRestaurant")
  })

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
    },
    isPending: false,
    error: null,
  }
  it("renders loading state", () => {
    useRestaurant.mockReturnValue({ data: null, isPending: true, error: null })
    render(
      <NavigationContainer>
        <RestaurantDetails route={{ params: { slug: "test" } }} />
      </NavigationContainer>,
    )
    expect(screen.getByText(/Loading…/i)).toBeOnTheScreen()
  })

  it("renders error state", () => {
    useRestaurant.mockReturnValue({
      data: null,
      isPending: false,
      error: { name: "Error", message: "Mock error" },
    })
    render(
      <NavigationContainer>
        <RestaurantDetails route={{ params: { slug: "test" } }} />
      </NavigationContainer>,
    )
    expect(
      screen.getByText(/Error loading restaurant details:/i, {
        exact: false,
      }),
    ).toBeOnTheScreen()
    expect(screen.getByText(/Mock error/i)).toBeOnTheScreen()
  })

  it("renders the RestaurantHeader and content when data is available", () => {
    useRestaurant.mockReturnValue(mockRestaurantData)
    render(
      <NavigationContainer>
        <RestaurantDetails route={{ params: { slug: "test" } }} />
      </NavigationContainer>,
    )

    expect(screen.getByText("Test Restaurant")).toBeOnTheScreen()
  })

  it("renders the RestaurantHeader and content when data is not available", () => {
    useRestaurant.mockReturnValue({ ...mockRestaurantData, data: null })
    render(
      <NavigationContainer>
        <RestaurantDetails route={{ params: { slug: "test" } }} />
      </NavigationContainer>,
    )

    expect(screen.getByText("Place an order")).toBeOnTheScreen()
  })
})
