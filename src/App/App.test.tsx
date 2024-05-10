import { fireEvent, render, screen } from "@testing-library/react-native"

import App from "./App"

const oldFetch = global.fetch
const mockFetch = jest.fn()
beforeAll(() => {
  global.fetch = mockFetch
})
afterAll(() => {
  global.fetch = oldFetch
})

jest.mock("../shared/services/pmo/favorite", () =>
  jest.fn().mockReturnValue(null),
)

describe("App", () => {
  const mockStateResponse = {
    data: [
      { short: "MI", name: "Michigan" },
      { short: "WI", name: "Wisconsin" },
      { short: "IL", name: "Illinois" },
    ],
  }

  const mockCitiesResponse = {
    data: [
      { name: "Detroit", state: "MI" },
      { name: "Ann Arbor", state: "MI" },
    ],
  }

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
        resources: {
          thumbnail: "api/resources/images/3-thumbnail.jpg",
          owner: "api/resources/images/2-owner.jpg",
          banner: "api/resources/images/4-banner.jpg",
        },
        _id: "AXUIBQBmxrk2EWq8",
      },
    ],
  }

  it("renders and navigates without issue", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockStateResponse),
        statusText: "OK",
        status: 200,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCitiesResponse),
        statusText: "OK",
        status: 200,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRestaurantsResponse),
        statusText: "OK",
        status: 200,
      })

    render(<App />)

    await screen.findAllByText(/Place My Order/i)

    const state = await screen.findByText(/Michigan/i, { exact: false })
    expect(state).toBeOnTheScreen()
    fireEvent.press(state)

    const city = await screen.findByText(/Detroit/i, { exact: false })
    expect(city).toBeOnTheScreen()
    fireEvent.press(city)

    expect(
      await screen.findByText(/Bagel Restaurant/i, { exact: false }),
    ).toBeOnTheScreen()
  })
})
