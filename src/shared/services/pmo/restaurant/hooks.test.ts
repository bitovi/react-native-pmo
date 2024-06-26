import { renderHook, waitFor } from "@testing-library/react-native"

import * as api from "../api/api"

import { useStates, useCities, useRestaurants } from "./hooks"

const apiRequest: jest.SpyInstance<ReturnType<typeof api.apiRequest>> =
  jest.spyOn(api, "apiRequest")

describe("Restaurant Hooks", () => {
  describe("useCities hook", () => {
    it("should return cities data successfully", async () => {
      const mockCities = [
        { id: 1, name: "City1" },
        { id: 2, name: "City2" },
      ]
      apiRequest.mockResolvedValue({ data: mockCities, error: undefined })

      const { result } = renderHook(() => useCities("test-state"))

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })

      expect(result.current.data).toEqual(mockCities)
      expect(result.current.error).toBeUndefined()
    })

    it("should handle error when fetching cities data", async () => {
      const mockError = new Error("Error fetching cities")
      apiRequest.mockResolvedValue({ data: undefined, error: mockError })

      const { result } = renderHook(() => useCities("test-state"))

      await waitFor(() => expect(result.current.isPending).toBeFalsy())
      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toEqual(mockError)
    })
  })

  describe("useRestaurant hook", () => {
    it("should return restaurant data successfully", async () => {
      const mockRestaurant = { id: 1, name: "Restaurant1" }
      apiRequest.mockResolvedValue({ data: mockRestaurant, error: undefined })

      const { result } = renderHook(() =>
        useRestaurants("test-state", "test-city"),
      )

      await waitFor(() => expect(result.current.isPending).toBeFalsy())
      expect(result.current.data).toEqual(mockRestaurant)
      expect(result.current.error).toBeUndefined()
    })

    it("should handle error when fetching restaurant data", async () => {
      const mockError = new Error("Error fetching restaurant")
      apiRequest.mockResolvedValue({ data: undefined, error: mockError })

      const { result } = renderHook(() =>
        useRestaurants("test-state", "test-city"),
      )

      await waitFor(() => expect(result.current.isPending).toBeFalsy())
      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toEqual(mockError)
    })
  })

  describe("useRestaurants hook", () => {
    it("should return restaurants data successfully", async () => {
      const mockRestaurants = [
        { id: 1, name: "Restaurant1" },
        { id: 2, name: "Restaurant2" },
      ]
      apiRequest.mockResolvedValue({ data: mockRestaurants, error: undefined })

      const { result } = renderHook(() =>
        useRestaurants("test-state", "test-city"),
      )

      await waitFor(() => expect(result.current.isPending).toBeFalsy())
      expect(result.current.data).toEqual(mockRestaurants)
      expect(result.current.error).toBeUndefined()
    })

    it("should handle error when fetching restaurants data", async () => {
      const mockError = new Error("Error fetching restaurants")
      apiRequest.mockResolvedValue({ data: undefined, error: mockError })

      const { result } = renderHook(() =>
        useRestaurants("test-state", "test-city"),
      )

      await waitFor(() => expect(result.current.isPending).toBeFalsy())
      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toEqual(mockError)
    })
  })

  describe("useStates hook", () => {
    it("should return states data successfully", async () => {
      const mockStates = [
        { id: 1, name: "State1" },
        { id: 2, name: "State2" },
      ]
      apiRequest.mockResolvedValue({ data: mockStates, error: undefined })

      const { result } = renderHook(() => useStates())

      await waitFor(() => expect(result.current.isPending).toBeFalsy())
      expect(result.current.data).toEqual(mockStates)
      expect(result.current.error).toBeUndefined()
    })

    it("should handle error when fetching states data", async () => {
      const mockError = new Error("Error fetching states")
      apiRequest.mockResolvedValue({ data: undefined, error: mockError })

      const { result } = renderHook(() => useStates())

      await waitFor(() => expect(result.current.isPending).toBeFalsy())
      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toEqual(mockError)
    })
  })
})
