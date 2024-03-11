import type { FC } from "react"
import type { StaticParamList } from "@react-navigation/native"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { registerRootComponent } from "expo"
import Home from "./screens/Home"
import OrderCreate from "./screens/OrderCreate"
import RestaurantList from "./screens/RestaurantList"
import RestaurantDetails from "./screens/RestaurantDetails"
import ThemeProvider from "./theme"

const RestaurantListNavigation = createNativeStackNavigator({
  initialRouteName: "RestaurantList",
  screens: {
    RestaurantList: {
      screen: RestaurantList,
      options: {
        title: "Restaurant List",
      },
    },
    RestaurantDetails: {
      screen: RestaurantDetails,
      options: {
        title: "Details",
      },
    },
    OrderCreate: {
      screen: OrderCreate,
      options: {
        title: "Create",
      },
    },
  },
})

const RootBottomNavigation = createBottomTabNavigator({
  initialRouteName: "Home",
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Home",
      },
    },
    RestaurantList: {
      screen: RestaurantListNavigation,
      options: {
        title: "Restaurant List",
        headerShown: false,
      },
    },
  },
})

type RootStackParamList = StaticParamList<typeof RestaurantListNavigation>

// Creating global  types for the navigation props to avoid importing them in every file
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootBottomNavigation)

const App: FC = () => {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  )
}

export default App

registerRootComponent(App)
