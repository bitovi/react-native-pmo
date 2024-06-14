import { render, screen } from "@testing-library/react-native"

import * as restaurantHooks from "../../shared/services/pmo/restaurant/hooks"

import RestaurantList from "./RestaurantList"

const useRestaurants: jest.SpyInstance<
  ReturnType<typeof restaurantHooks.useRestaurants>
> = jest.spyOn(restaurantHooks, "useRestaurants")

const params = {
  state: {
    short: "",
    name: "",
  },
  city: {
    name: "",
    state: "",
  },
}

describe("RestaurantList component", () => {
  const mockRestaurantsResponse = {
    data: [
      {
        name: "Bagel Restaurant",
        slug: "bagel-restaurant",
        images: {
          thumbnail:
            "node_modules/place-my-order-assets/images/3-thumbnail.jpg",
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
      {
        name: "Brunch Barn",
        slug: "brunch-barn",
        images: {
          thumbnail:
            "node_modules/place-my-order-assets/images/4-thumbnail.jpg",
          owner: "node_modules/place-my-order-assets/images/1-owner.jpg",
          banner: "node_modules/place-my-order-assets/images/4-banner.jpg",
        },
        menu: {
          lunch: [
            { name: "Gunthorp Chicken", price: 21.99 },
            { name: "Ricotta Gnocchi", price: 15.99 },
            { name: "Roasted Salmon", price: 23.99 },
          ],
          dinner: [
            { name: "Charred Octopus", price: 25.99 },
            { name: "Herring in Lavender Dill Reduction", price: 45.99 },
            { name: "Steamed Mussels", price: 21.99 },
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
          owner: "api/resources/images/2-owner.jpg",
          banner: "api/resources/images/4-banner.jpg",
        },
        _id: "AXUIBQBmxrk2EWq8",
      },
    ],
  }

  it("renders restaurant List", () => {
    useRestaurants.mockReturnValue({
      ...mockRestaurantsResponse,
      error: null,
      isPending: false,
    })

    render(<RestaurantList route={{ params }} />)

    expect(screen.getByText(/Bagel Restaurant/i)).toBeOnTheScreen()
    expect(screen.getByText(/Brunch Barn/i)).toBeOnTheScreen()
  })

  it("renders loading restaurant", () => {
    useRestaurants.mockReturnValue({ data: null, error: null, isPending: true })

    render(<RestaurantList route={{ params }} />)

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })

  it("renders error restaurant", () => {
    useRestaurants.mockReturnValue({
      data: null,
      error: { name: "Oops", message: "This is the error" },
      isPending: false,
    })

    render(<RestaurantList route={{ params }} />)

    expect(screen.getByText(/Error loading restaurants/)).toBeOnTheScreen()
    expect(screen.getByText(/This is the error/)).toBeOnTheScreen()
  })
})
