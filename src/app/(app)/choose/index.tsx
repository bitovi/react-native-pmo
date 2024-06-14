import { Link } from "expo-router"
import { Text } from "react-native"

import Screen from "@shared/design/Screen"

const StatesPage: React.FC = () => {
  return (
    <Screen title="Choose a State">
      <Text>States</Text>
      <Link href="/choose/IL">Illinois</Link>
    </Screen>
  )
}

export default StatesPage
