import { useLocalSearchParams } from "expo-router"

import CityList from "@screens/CityList"

const CitiesPage: React.FC = () => {
  const { state } = useLocalSearchParams<{ state: string }>()

  return <CityList state={state as string} />
}

export default CitiesPage
