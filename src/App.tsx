import type { FC } from "react"
import type { StaticParamList } from "@react-navigation/native"
import { useEffect } from "react"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/Ionicons"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

import ThemeProvider, { theme } from "./theme"

import AuthProvider from "./services/auth"

import Home from "./screens/Home"
import OrderCreate from "./screens/RestaurantOrder"
import StateList from "./screens/StateList"
import CityList from "./screens/CityList"
import RestaurantList from "./screens/RestaurantList"
import RestaurantDetails from "./screens/RestaurantDetails"
import { useNetInfo } from "@react-native-community/netinfo"
import { useFavorites } from "./services/favorite/hook"

type RootStackParamList = StaticParamList<typeof StateListNavigation> &
  StaticParamList<typeof RootBottomNavigation>

// Creating global  types for the navigation props to avoid importing them in every file
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const StateListNavigation = createNativeStackNavigator({
  initialRouteName: "StateList",
  screens: {
    StateList: {
      screen: StateList,
      options: {
        title: "Select a state",
      },
    },
    CityList: {
      screen: CityList,
      options: {
        title: "Select a city",
      },
    },
    RestaurantList: {
      screen: RestaurantList,
      options: {
        title: "Select a restaurant",
      },
    },
    RestaurantDetails: {
      screen: RestaurantDetails,
      options: {
        title: "",
      },
    },
    OrderCreate: {
      screen: OrderCreate,
      options: {
        title: "",
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
        title: "Place My Order",
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarIcon: ({ focused }) => (
          <Icon
            name="home-outline"
            size={20}
            color={focused ? theme.colors.secondary : theme.colors.text}
          />
        ),
      },
    },
    StateListStack: {
      screen: StateListNavigation,
      headerBackTitle: "",
      options: {
        title: "Find a Restaurant",
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarIcon: ({ focused }) => (
          <Icon
            name="restaurant-outline"
            size={20}
            color={focused ? theme.colors.secondary : theme.colors.text}
          />
        ),
      },
    },
  },
})

const Navigation = createStaticNavigation(RootBottomNavigation)

const App: FC = () => {
  const { isConnected } = useNetInfo()
  const { syncWithServer, localFavorites } = useFavorites("user-id")

  useEffect(() => {
    if (isConnected && localFavorites) {
      syncWithServer()
    }
  }, [isConnected, localFavorites, syncWithServer])

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <SafeAreaView style={{ height: "100%", width: "100%" }}>
            <Navigation />
          </SafeAreaView>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
