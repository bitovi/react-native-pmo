import { useEffect, useState } from "react"
import { apiRequest } from "../api"
import type { Favorite } from "./interfaces"
import { storeData, getData } from "../storage"

interface FavoriteResponse {
  data: Favorite[] | null
  error: Error | null
  isPending: boolean
}

interface LocalStorageFavorites {
  lastSynced: Date
  favorites: Favorite[]
}

export function useFavorites(
  userId: string, restaurantId?: string
): FavoriteResponse & {
  updateFavorites: (restaurantId: Favorite["restaurantId"]) => void
  favorite: Favorite | undefined
} {
  const [response, setResponse] = useState<FavoriteResponse>({
    data: null,
    error: null,
    isPending: true,
  })
  const [localFavorites, setLocalFavorites] = useState<
    LocalStorageFavorites | undefined
  >()
  const [favorite, setFavorite] = useState<Favorite | undefined>()

  useEffect(
    () => {
      const fetchData = async () => {
        const localFavorites =
        await getData<LocalStorageFavorites>("my-favorite")
        setLocalFavorites(localFavorites)

        const { data, error } = await apiRequest<FavoriteResponse>({
          method: "GET",
          path: "/favorites",
          params: {
            "userId": userId,
          },
        })

        setResponse({
          data: data?.data || null,
          error: error,
          isPending: false,
        })
      }
      fetchData()
    },
    [
      userId
    ],
  )

  useEffect(() => {
    if (restaurantId) {
      const getFavorite = async (restaurantId: Favorite["restaurantId"]) => {
        const foundFavorite = localFavorites?.favorites.find(
          (favorite) => favorite.restaurantId === restaurantId,
        )
        setFavorite(foundFavorite)
      }

      getFavorite(restaurantId)
    }
  }, [restaurantId, localFavorites])

  const updateFavorites = async (restaurantId: Favorite["restaurantId"]) => {
    if (localFavorites?.favorites) {
      const favoriteIndex = localFavorites.favorites.findIndex(
        (favorite) => favorite.restaurantId === restaurantId,
      )
      const newFavorites = [...localFavorites.favorites]
      const timestamp = new Date()
      let newFavorite = {};
      
      if (favoriteIndex === -1) {
        newFavorite = {
          userId: userId,
          restaurantId: restaurantId,
          favorite: true,
          datetimeUpdated: timestamp,
        }
        newFavorites.push(newFavorite  as Favorite)
      } else {
        newFavorite = {
          ...newFavorites[favoriteIndex],
          favorite: !newFavorites[favoriteIndex].favorite,
          datetimeUpdated: timestamp,
        }
        newFavorites[favoriteIndex] = newFavorite as Favorite;
      }
      
      const newLocalFavorites = {
        lastSynced: timestamp,
        favorites: newFavorites,
      }
      await storeData<LocalStorageFavorites>("my-favorite", newLocalFavorites)
      setLocalFavorites(newLocalFavorites)
      setResponse({ data: newFavorites, error: null, isPending: false })
      
      await apiRequest<FavoriteResponse>({
        method: "POST",
        path: "/favorites",
        body: newFavorite
      })
    }
  }

  return { ...response, updateFavorites, favorite }
}
