import { render, screen } from "@testing-library/react-native"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import * as restaurantHooks from "../../services/pmo/restaurant/hooks"

import CityList from "./CityList"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

describe("CityList component", () => {
  // Mock the hooks and components used in CityList

  const mockCitiesResponse = {
    data: [
      { name: "Detroit", state: "MI" },
      { name: "Ann Arbor", state: "MI" },
    ],
  }
  let useCities: jest.SpyInstance<ReturnType<typeof restaurantHooks.useCities>>
  beforeEach(() => {
    jest.resetAllMocks()
    useCities = jest.spyOn(restaurantHooks, "useCities")
  })

  const mockStackNavigator = createNativeStackNavigator({
    initialRouteName: "CityList",
    screens: {
      StateList: {
        screen: CityList,
        initialParams: { state: "" },
        options: {
          title: "Cities",
        },
      },
    },
  })

  const MockCityNavigation = createStaticNavigation(mockStackNavigator)

  it("renders city List", () => {
    useCities.mockReturnValue({
      ...mockCitiesResponse,
      error: null,
      isPending: false,
    })

    render(<MockCityNavigation />)
    expect(screen.getByText(/Detroit/i)).toBeOnTheScreen()
    expect(screen.getByText(/Ann Arbor/i)).toBeOnTheScreen()
  })

  it("renders loading city", () => {
    useCities.mockReturnValue({ data: null, error: null, isPending: true })

    render(<MockCityNavigation />)

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })
  it("renders error city", () => {
    useCities.mockReturnValue({
      data: null,
      error: { name: "Oops", message: "This is the error" },
      isPending: false,
    })

    render(<MockCityNavigation />)

    expect(screen.getByText(/Error loading cities:/)).toBeOnTheScreen()
    expect(screen.getByText(/This is the error/)).toBeOnTheScreen()
  })
})
