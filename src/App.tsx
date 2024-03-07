import type { FC } from "react"
import type { StaticParamList } from "@react-navigation/native"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { registerRootComponent } from "expo"
import Home from "./screens/Home"
import OrderCreate from "./screens/OrderCreate"
import RestaurantList from "./screens/RestaurantList"
import RestaurantDetails from "./screens/RestaurantDetails"

const RootStack = createNativeStackNavigator({
  initialRouteName: "Home",
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Home",
      },
    },
    OrderCreate: {
      screen: OrderCreate,
      options: {
        title: "Order",
      },
    },
    RestaurantList: {
      screen: RestaurantList,
      options: {
        title: "Find a restaurant",
      },
    },
    RestaurantDetails: {
      screen: RestaurantDetails,
      options: {
        title: "Details",
      },
    },
  },
})

type RootStackParamList = StaticParamList<typeof RootStack>

// Creating global  types for the navigation props to avoid importing them in every file
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack)

const App: FC = () => {
  return <Navigation />
}

export default App

registerRootComponent(App)
