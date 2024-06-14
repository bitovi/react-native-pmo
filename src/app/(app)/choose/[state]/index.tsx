import { Link, useLocalSearchParams } from "expo-router"
import { Text } from "react-native"

import Screen from "@shared/design/Screen"

const CitiesPage: React.FC = () => {
  const { state } = useLocalSearchParams()

  return (
    <Screen title="Choose a City">
      <Text>Cities in {state}</Text>
      <Link href={`/choose/${state}/Chicago`}>Chicago</Link>
    </Screen>
  )
}

export default CitiesPage
