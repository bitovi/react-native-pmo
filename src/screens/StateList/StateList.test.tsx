import { render, screen } from "@testing-library/react-native"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import * as restaurantHooks from "../../services/pmo/restaurant/hooks"

import StateList from "./StateList"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

describe("StateList component", () => {
  // Mock the hooks and components used in StateList

  const mockStateResponse = {
    data: [
      { short: "MI", name: "Michigan" },
      { short: "WI", name: "Wisconsin" },
      { short: "IL", name: "Illinois" },
    ],
  }
  let useStates: jest.SpyInstance<ReturnType<typeof restaurantHooks.useStates>>
  beforeEach(() => {
    jest.resetAllMocks()
    useStates = jest.spyOn(restaurantHooks, "useStates")
  })

  const mockStackNavigator = createNativeStackNavigator({
    initialRouteName: "StateList",
    screens: {
      StateList: {
        screen: StateList,
        options: {
          title: "States",
        },
      },
    },
  })

  const MockStateNavigaton = createStaticNavigation(mockStackNavigator)

  it("renders State List", () => {
    useStates.mockReturnValue({
      ...mockStateResponse,
      error: null,
      isPending: false,
    })

    render(<MockStateNavigaton />)
    expect(screen.getByText(/Michigan/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
  })

  it("renders loading state", () => {
    useStates.mockReturnValue({ data: null, error: null, isPending: true })

    render(<MockStateNavigaton />)

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })
  it("renders error state", () => {
    useStates.mockReturnValue({
      data: null,
      error: { name: "Oops", message: "This is the error" },
      isPending: false,
    })

    render(<MockStateNavigaton />)

    expect(screen.getByText(/Error loading states:/)).toBeOnTheScreen()
    expect(screen.getByText(/This is the error/)).toBeOnTheScreen()
  })
})
