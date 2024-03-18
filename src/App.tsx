import type { FC } from "react"
import type { StaticParamList } from "@react-navigation/native"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { registerRootComponent } from "expo"
import Home from "./screens/Home"
import OrderCreate from "./screens/OrderCreate"
import StateList from "./screens/StateList"
import CityList from "./screens/CityList"
import RestaurantList from "./screens/RestaurantList"
import RestaurantDetails from "./screens/RestaurantDetails"
import ThemeProvider from "./theme"
import { Box } from "./components"

const StateListNavigation = createNativeStackNavigator({
  initialRouteName: "StateList",
  screens: {
    StateList: {
      screen: StateList,
      options: {
        title: "States",
      },
    },
    CityList: {
      screen: CityList,
      options: {
        title: "Cities",
      },
    },
    RestaurantList: {
      screen: RestaurantList,
      options: {
        title: "Restaurants",
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
    StateListStack: {
      screen: StateListNavigation,
      options: {
        title: "Find a Restaurant",
        headerShown: false,
      },
    },
  },
})

type RootStackParamList = StaticParamList<typeof StateListNavigation> & StaticParamList<typeof RootBottomNavigation>

// Creating global  types for the navigation props to avoid importing them in every file
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const Navigation = createStaticNavigation(RootBottomNavigation)

const App: FC = () => {
  return (
    <ThemeProvider>
      <Box style={{ width: "100%", height: "100%", overflow: "scroll" }}>
        <Navigation />
      </Box>
    </ThemeProvider>
  )
}

export default App

registerRootComponent(App)
