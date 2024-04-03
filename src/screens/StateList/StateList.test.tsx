import { render, screen } from "@testing-library/react-native"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import * as restaurant from "../../services/pmo/restaurant"

import StateList from "./StateList"

describe("StateList component", () => {
  // Mock the hooks and components used in StateList

  const mockStateResponse = {
    data: [
      { short: "MI", name: "Michigan" },
      { short: "WI", name: "Wisconsin" },
      { short: "IL", name: "Illinois" },
    ],
  }
  let useStates: jest.SpyInstance<ReturnType<typeof restaurant.useStates>>
  beforeEach(() => {
    jest.resetAllMocks()
    useStates = jest.spyOn(restaurant, "useStates")
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
