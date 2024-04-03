import type { FC } from "react"
import type { StaticParamList } from "@react-navigation/native"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/Ionicons"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

import Home from "./screens/Home"
import OrderCreate from "./screens/RestaurantOrder"
import StateList from "./screens/StateList"
import CityList from "./screens/CityList"
import RestaurantList from "./screens/RestaurantList"
import RestaurantDetails from "./screens/RestaurantDetails"
import ThemeProvider from "./theme"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { theme } from "./theme/theme"

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

const googleOauthwebClientId = process.env.GOOGLE_OAUTH_CLIENT_ID
GoogleSignin.configure({
  scopes: ["openid", "profile", "email"],
  webClientId: googleOauthwebClientId,
})

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
