import { Link, usePathname } from "expo-router"
import { Text } from "react-native"

import Screen from "@shared/design/Screen"

const NotFoundScreen: React.FC = () => {
  const pathname = usePathname()

  return (
    <Screen title="Oops! Page not found.">
      <Text>{pathname}</Text>
      <Link href="/">Go to home screen</Link>
    </Screen>
  )
}

export default NotFoundScreen
