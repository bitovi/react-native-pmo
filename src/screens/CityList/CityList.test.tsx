import { render, screen } from "@testing-library/react-native"

import * as restaurantHooks from "../../shared/services/pmo/restaurant/hooks"

import CityList from "./CityList"
import MockApp from "../../App/MockApp"

const useCities: jest.SpyInstance<
  ReturnType<typeof restaurantHooks.useCities>
> = jest.spyOn(restaurantHooks, "useCities")

describe("CityList component", () => {
  const mockCitiesResponse = {
    data: [
      { name: "Detroit", state: "MI" },
      { name: "Ann Arbor", state: "MI" },
    ],
  }

  it("renders city List", () => {
    useCities.mockReturnValue({
      ...mockCitiesResponse,
      error: null,
      isPending: false,
    })

    render(
      <MockApp
        component={CityList}
        params={{ state: { name: "test", short: "test" } }}
      />,
    )

    expect(screen.getByText(/Detroit/i)).toBeOnTheScreen()
    expect(screen.getByText(/Ann Arbor/i)).toBeOnTheScreen()
  })

  it("renders loading city", () => {
    useCities.mockReturnValue({ data: null, error: null, isPending: true })

    render(
      <MockApp
        component={CityList}
        params={{ state: { name: "test", short: "test" } }}
      />,
    )

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })

  it("renders error city", () => {
    useCities.mockReturnValue({
      data: null,
      error: { name: "Oops", message: "This is the error" },
      isPending: false,
    })

    render(
      <MockApp
        component={CityList}
        params={{ state: { name: "test", short: "test" } }}
      />,
    )

    expect(screen.getByText(/Error loading cities:/)).toBeOnTheScreen()
    expect(screen.getByText(/This is the error/)).toBeOnTheScreen()
  })
})
