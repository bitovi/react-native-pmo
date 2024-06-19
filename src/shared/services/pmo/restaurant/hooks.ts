import { useEffect, useState } from "react"

import { apiRequest } from "../api"

import { City, Restaurant, State } from "./interfaces"

type HookResult<Data> = {
  data?: Data
  error?: Error
  isPending: boolean
}

type StatesResult = HookResult<State[]>
type CitiesResult = HookResult<City[]>
type RestaurantsResult = HookResult<Restaurant[]>
type RestaurantResult = HookResult<Restaurant>

export function useStates(): StatesResult {
  const [response, setResponse] = useState<StatesResult>({
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      setResponse({
        data: undefined,
        error: undefined,
        isPending: true,
      })

      const { data, error } = await apiRequest<State[]>({
        method: "GET",
        path: "/states",
      })

      setResponse({
        data,
        error,
        isPending: false,
      })
    }

    fetchData()
  }, [])

  return response
}

export function useCities(state?: string): CitiesResult {
  const [response, setResponse] = useState<CitiesResult>({
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await apiRequest<City[]>({
        method: "GET",
        path: "/cities",
        params: {
          state: state,
        },
      })

      setResponse({
        data,
        error,
        isPending: false,
      })
    }

    if (state) {
      fetchData()
    } else {
      setResponse({
        data: undefined,
        error: undefined,
        isPending: false,
      })
    }
  }, [state])

  return response
}

export function useRestaurants(
  state?: string,
  city?: string,
): RestaurantsResult {
  const [response, setResponse] = useState<RestaurantsResult>({
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await apiRequest<Restaurant[]>({
        method: "GET",
        path: "/restaurants",
        params: {
          "filter[address.state]": state,
          "filter[address.city]": city,
        },
      })

      setResponse({
        data,
        error,
        isPending: false,
      })
    }

    if (state && city) {
      fetchData()
    } else {
      setResponse({
        data: undefined,
        error: undefined,
        isPending: false,
      })
    }
  }, [state, city])

  return response
}

export function useRestaurant(slug?: string): RestaurantResult {
  const [response, setResponse] = useState<RestaurantResult>({
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await apiRequest<Restaurant>({
        method: "GET",
        path: `/restaurants/${slug}`,
      })

      setResponse({
        data: data,
        error,
        isPending: false,
      })
    }

    if (slug) {
      fetchData()
    } else {
      setResponse({
        data: undefined,
        error: undefined,
        isPending: false,
      })
    }
  }, [slug])

  return response
}
