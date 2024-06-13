import { render, screen } from "@testing-library/react-native"

import MockApp from "../../OldApp/MockApp"
import * as restaurantHooks from "../../shared/services/pmo/restaurant/hooks"

import RestaurantOrder from "./RestaurantOrder"

const useRestaurant: jest.SpyInstance<
  ReturnType<typeof restaurantHooks.useRestaurant>
> = jest.spyOn(restaurantHooks, "useRestaurant")

describe("RestaurantOrder component", () => {
  const mockRestaurantResponse = {
    data: {
      name: "Bagel Restaurant",
      slug: "bagel-restaurant",
      images: {
        thumbnail: "node_modules/place-my-order-assets/images/3-thumbnail.jpg",
        owner: "node_modules/place-my-order-assets/images/1-owner.jpg",
        banner: "node_modules/place-my-order-assets/images/2-banner.jpg",
      },
      menu: {
        lunch: [
          { name: "Crab Pancakes with Sorrel Syrup", price: 35.99 },
          { name: "Steamed Mussels", price: 21.99 },
          { name: "Roasted Salmon", price: 23.99 },
        ],
        dinner: [
          { name: "Truffle Noodles", price: 14.99 },
          { name: "Spinach Fennel Watercress Ravioli", price: 35.99 },
          { name: "Herring in Lavender Dill Reduction", price: 45.99 },
        ],
      },
      address: {
        street: "285 W Adams Ave",
        city: "Detroit",
        state: "MI",
        zip: "60045",
      },
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      resources: {
        thumbnail: "api/resources/images/3-thumbnail.jpg",
        owner: "api/resources/images/4-owner.jpg",
        banner: "api/resources/images/1-banner.jpg",
      },
      _id: "5NVE3Z5MXxX3O57R",
    },
  }

  it("renders restaurant order form", () => {
    useRestaurant.mockReturnValue({
      ...mockRestaurantResponse,
      error: null,
      isPending: false,
    })

    render(
      <MockApp
        component={RestaurantOrder}
        params={{ restaurantId: "bagel-restaurant" }}
      />,
    )

    expect(screen.getByText(/Lunch Menu/i)).toBeOnTheScreen()
    expect(
      screen.getByText(mockRestaurantResponse.data.menu.lunch[0].name, {
        exact: false,
      }),
    ).toBeOnTheScreen()
    expect(screen.getByText(/Dinner Menu/i)).toBeOnTheScreen()
    expect(
      screen.getByText(mockRestaurantResponse.data.menu.dinner[0].name, {
        exact: false,
      }),
    ).toBeOnTheScreen()
  })

  it("renders loading restaurant", () => {
    useRestaurant.mockReturnValue({ data: null, error: null, isPending: true })

    render(
      <MockApp
        component={RestaurantOrder}
        params={{ restaurantId: "bagel-restaurant" }}
      />,
    )

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })

  it("renders error restaurant", () => {
    useRestaurant.mockReturnValue({
      data: null,
      error: { name: "Oops", message: "This is the error" },
      isPending: false,
    })

    render(
      <MockApp
        component={RestaurantOrder}
        params={{ restaurantId: "bagel-restaurant" }}
      />,
    )

    expect(
      screen.getByText(/Error loading restaurant order:/),
    ).toBeOnTheScreen()
    expect(screen.getByText(/This is the error/)).toBeOnTheScreen()
  })
})
