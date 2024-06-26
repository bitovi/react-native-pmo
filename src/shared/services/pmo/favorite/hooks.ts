import { useEffect, useState } from "react"

import { storeData, getData } from "../../storage/storage"
import { apiRequest } from "../api"

type HookResult<Data> = {
  data?: Data
  error?: Error
  isPending: boolean
}

interface LocalStorageFavorites {
  lastSynced: Date
  favorites: Favorite[]
}

interface Favorite {
  userId: string
  restaurantId: string
  favorite: boolean
  datetimeUpdated: Date
  _id?: string
}

type FavoritesResponse = HookResult<Favorite[]>
type FavoriteResponse = HookResult<Favorite>

export const useFavorites = (
  userId?: string,
  restaurantId?: string,
): FavoritesResponse & {
  updateFavorites: (restaurantId: Favorite["restaurantId"]) => void
  favorite: Favorite | undefined
  syncWithServer: () => void
  localFavorites: LocalStorageFavorites | undefined
} => {
  const [response, setResponse] = useState<FavoritesResponse>({
    data: undefined,
    error: undefined,
    isPending: true,
  })
  const [localFavorites, setLocalFavorites] = useState<
    LocalStorageFavorites | undefined
  >()
  const [favorite, setFavorite] = useState<Favorite | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const localFavorites = await getData<LocalStorageFavorites>("my-favorite")
      setLocalFavorites(localFavorites)

      const { data, error } = await apiRequest<Favorite[]>({
        method: "GET",
        path: "/favorites",
        params: {
          userId: userId,
        },
      })

      setResponse({
        data,
        error,
        isPending: false,
      })
    }
    if (userId) {
      fetchData()
    }
  }, [userId])

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
      let newFavorite = {}

      if (favoriteIndex === -1) {
        newFavorite = {
          userId: userId,
          restaurantId: restaurantId,
          favorite: true,
          datetimeUpdated: timestamp,
        }
        newFavorites.push(newFavorite as Favorite)
      } else {
        newFavorite = {
          ...newFavorites[favoriteIndex],
          favorite: !newFavorites[favoriteIndex].favorite,
          datetimeUpdated: timestamp,
        }
        newFavorites[favoriteIndex] = newFavorite as Favorite
      }

      const { data: postRes, error } = await apiRequest<Favorite>({
        method: "POST",
        path: "/favorites",
        body: newFavorite,
      })

      if (!("_id" in newFavorite) && postRes) {
        newFavorites[newFavorites.length - 1]._id = postRes._id
      }

      const newLocalFavorites = {
        lastSynced: error ? localFavorites.lastSynced : timestamp,
        favorites: newFavorites,
      }

      await storeData<LocalStorageFavorites>("my-favorite", newLocalFavorites)
      setLocalFavorites(newLocalFavorites)
      setResponse({ data: newFavorites, error: error, isPending: false })
    }
  }

  const syncWithServer = async () => {
    if (localFavorites) {
      const { data: serverData } = await apiRequest<FavoritesResponse>({
        method: "GET",
        path: "/favorites",
        params: {
          userId,
          "datetimeUpdated[$gt]": localFavorites?.lastSynced.toISOString(),
        },
      })

      const newLocalFavorites = {
        lastSynced: new Date(),
        favorites: [...localFavorites.favorites],
      }

      if (serverData?.data) {
        if (serverData.data.length !== 0) {
          serverData.data.forEach((serverFavorite) => {
            const updateIndex = newLocalFavorites.favorites.findIndex(
              (localFavorite) => localFavorite._id === serverFavorite._id,
            )
            newLocalFavorites.favorites[updateIndex] = { ...serverFavorite }
          })
        }
        await Promise.all(
          newLocalFavorites.favorites.map(async (newLocalFavorite, index) => {
            if (
              new Date(localFavorites.lastSynced) <
                new Date(newLocalFavorite.datetimeUpdated) &&
              serverData.data?.findIndex(
                (serverFavorite) => newLocalFavorite._id === serverFavorite._id,
              ) === -1
            ) {
              const { data: postRes, error } =
                await apiRequest<FavoriteResponse>({
                  method: "POST",
                  path: "/favorites",
                  body: {
                    ...newLocalFavorite,
                    datetimeUpdated: newLocalFavorites.lastSynced,
                  },
                })
              if (error) {
                newLocalFavorites.lastSynced = localFavorites.lastSynced
              }
              if (postRes && postRes.data) {
                newLocalFavorites.favorites[index] = { ...postRes.data }
              }
            }
          }),
        )

        await storeData<LocalStorageFavorites>("my-favorite", newLocalFavorites)
      }
    }
  }

  return {
    ...response,
    updateFavorites,
    favorite,
    syncWithServer,
    localFavorites,
  }
}
