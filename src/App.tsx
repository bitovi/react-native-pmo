import type { FC } from "react"
import type { StaticParamList } from "@react-navigation/native"
import { Suspense, lazy, useEffect } from "react"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/Ionicons"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import ThemeProvider, { theme } from "./theme"
import AuthProvider from "./services/auth"
import Home from "./screens/Home"
import type { Props as CityProps } from "./screens/CityList"
import type { Props as RestaurantListProps } from "./screens/RestaurantList"
import type { Props as DetailsProps } from "./screens/RestaurantDetails"
import type { Props as OrderProps } from "./screens/RestaurantOrder"
import { Loading } from "./components"
import { useNetInfo } from "@react-native-community/netinfo"
import { useFavorites } from "./services/pmo/favorite/hook"

type RootStackParamList = StaticParamList<typeof StateListNavigation> &
  StaticParamList<typeof RootBottomNavigation>

// Creating global  types for the navigation props to avoid importing them in every file
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const StateList = lazy(() => import("./screens/StateList"))
const CityList = lazy(() => import("./screens/CityList"))
const RestaurantList = lazy(() => import("./screens/RestaurantList"))
const RestaurantDetails = lazy(() => import("./screens/RestaurantDetails"))
const OrderCreate = lazy(() => import("./screens/RestaurantOrder"))

const SuspenseStateList: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <StateList />
    </Suspense>
  )
}

const SuspenseCityList: FC<CityProps> = ({ route }) => {
  return (
    <Suspense fallback={<Loading />}>
      <CityList route={route} />
    </Suspense>
  )
}

const SuspenseRestaurantList: FC<RestaurantListProps> = ({ route }) => {
  return (
    <Suspense fallback={<Loading />}>
      <RestaurantList route={route} />
    </Suspense>
  )
}

const SuspenseRestaurantDetails: FC<DetailsProps> = ({ route }) => {
  return (
    <Suspense fallback={<Loading />}>
      <RestaurantDetails route={route} />
    </Suspense>
  )
}

const SuspenseOrderCreate: FC<OrderProps> = ({ route }) => {
  return (
    <Suspense fallback={<Loading />}>
      <OrderCreate route={route} />
    </Suspense>
  )
}

const StateListNavigation = createNativeStackNavigator({
  initialRouteName: "StateList",
  screens: {
    StateList: {
      screen: SuspenseStateList,
      options: {
        title: "Select a state",
      },
    },
    CityList: {
      screen: SuspenseCityList,
      options: {
        title: "Select a city",
      },
    },
    RestaurantList: {
      screen: SuspenseRestaurantList,
      options: {
        title: "Select a restaurant",
      },
    },
    RestaurantDetails: {
      screen: SuspenseRestaurantDetails,
      options: {
        title: "",
      },
    },
    OrderCreate: {
      screen: SuspenseOrderCreate,
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
