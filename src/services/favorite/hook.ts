import { useEffect, useState } from "react"
// import { apiRequest } from "../api"
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
  restaurantId?: string /*userId*/,
): FavoriteResponse & {
  updateFavorites: (restaurantId: Favorite["restaurantId"]) => void
  favorite: Favorite | undefined
} {
  const [response, setResponse] = useState<FavoriteResponse>({
    data: null,
    error: null,
    isPending: true,
  })
  const [favorites, setFavorites] = useState<
    LocalStorageFavorites | undefined
  >()
  const [favorite, setFavorite] = useState<Favorite | undefined>()

  useEffect(
    () => {
      const fetchData = async () => {
        const localFavorites =
          await getData<LocalStorageFavorites>("my-favorite")
        setFavorites(localFavorites)

        // const { data, error } = await apiRequest<FavoriteResponse>({
        //   method: "GET",
        //   path: "/favorites",
        //   params: {
        //     "userId": userId,
        //   },
        // })

        setResponse({
          data: [
            {
              userId: "",
              restaurantId: "4trq8tS9W07RiN7t",
              favorite: true,
              datetimeUpdated: new Date(),
            },
          ],
          error: null,
          //data: data?.data || null,
          //error: error,
          isPending: false,
        })
      }
      fetchData()
    },
    [
      /*userId*/
    ],
  )

  useEffect(() => {
    if (restaurantId) {
      const getFavorite = async (restaurantId: Favorite["restaurantId"]) => {
        console.log('get',favorites)
        const foundFavorite = favorites?.favorites.find(
          (favorite) => favorite.restaurantId === restaurantId,
        )
        setFavorite(foundFavorite)
      }

      getFavorite(restaurantId)
    }
  }, [restaurantId, favorites])

  const updateFavorites = async (restaurantId: Favorite["restaurantId"]) => {
    if (response.data) {
      const favoriteIndex = response.data.findIndex(
        (favorite) => favorite.restaurantId === restaurantId,
      )
      const newFavorites = [...response.data]
      const timestamp = new Date()
      if (favoriteIndex === -1) {
        newFavorites.push({
          userId: "",
          restaurantId: restaurantId,
          favorite: true,
          datetimeUpdated: timestamp,
        })
      } else {
        newFavorites[favoriteIndex] = {
          ...newFavorites[favoriteIndex],
          favorite: !newFavorites[favoriteIndex].favorite,
          datetimeUpdated: timestamp,
        }
      }
      
      const newLocalFavorites = {
        lastSynced: timestamp,
        favorites: newFavorites,
      }
      await storeData<LocalStorageFavorites>("my-favorite", newLocalFavorites)
      setFavorites(newLocalFavorites)
      setResponse({ data: newFavorites, error: null, isPending: false })
      // and api call
    }
  }

  return { ...response, updateFavorites, favorite }
}
