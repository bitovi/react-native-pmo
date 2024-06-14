import { render, screen } from "@testing-library/react-native"

import * as restaurantHooks from "@shared/services/pmo/restaurant/hooks"

import StateList from "./StateList"

const useStates: jest.SpyInstance<
  ReturnType<typeof restaurantHooks.useStates>
> = jest.spyOn(restaurantHooks, "useStates")

describe("StateList component", () => {
  const mockStateResponse = {
    data: [
      { short: "MI", name: "Michigan" },
      { short: "WI", name: "Wisconsin" },
      { short: "IL", name: "Illinois" },
    ],
  }

  it("renders State List", () => {
    useStates.mockReturnValue({
      ...mockStateResponse,
      error: undefined,
      isPending: false,
    })

    render(<StateList />)

    expect(screen.getByText(/Michigan/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
  })

  it("renders loading state", () => {
    useStates.mockReturnValue({
      data: undefined,
      error: undefined,
      isPending: true,
    })

    render(<StateList />)

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })

  it("renders error state", () => {
    useStates.mockReturnValue({
      data: undefined,
      error: { name: "Oops", message: "This is the error" },
      isPending: false,
    })

    render(<StateList />)

    expect(screen.getByText(/Error loading states:/)).toBeOnTheScreen()
    expect(screen.getByText(/This is the error/)).toBeOnTheScreen()
  })
})
