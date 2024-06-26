import { useNetInfo } from "@react-native-community/netinfo"
import { useEffect } from "react"

import { useUser } from "../../auth"

import { useFavorites } from "./hooks"

const FavoritesSync: React.FC = () => {
  useFavoritesSync()

  return <></>
}

export default FavoritesSync

function useFavoritesSync(): void {
  const user = useUser()
  const { isConnected } = useNetInfo()
  const { syncWithServer, localFavorites } = useFavorites(user?.id)

  useEffect(() => {
    if (user && isConnected && localFavorites) {
      syncWithServer()
    }
  }, [isConnected, localFavorites, syncWithServer, user])
}
