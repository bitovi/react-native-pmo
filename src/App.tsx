import type { FC } from "react"
import type { StaticParamList } from "@react-navigation/native"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { registerRootComponent } from "expo"
import Home from "./screens/Home"
import OrderCreate from "./screens/RestaurantOrder"
import StateList from "./screens/StateList"
import CityList from "./screens/CityList"
import RestaurantList from "./screens/RestaurantList"
import RestaurantDetails from "./screens/RestaurantDetails"
import ThemeProvider from "./theme"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

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

type RootStackParamList = StaticParamList<typeof StateListNavigation> &
  StaticParamList<typeof RootBottomNavigation>

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
    <SafeAreaProvider>
      <ThemeProvider>
        <SafeAreaView
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Navigation />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App

registerRootComponent(App)
