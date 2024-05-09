import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/Ionicons"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import ThemeProvider, { useTheme } from "../shared/design/theme"
import AuthProvider from "../shared/services/auth"
import Settings from "../screens/Settings"
import StateList from "../screens/StateList"
import CityList from "../screens/CityList"
import RestaurantDetails from "../screens/RestaurantDetails"
import RestaurantList from "../screens/RestaurantList"
import RestaurantOrder from "../screens/RestaurantOrder"
import DataMigration from "../shared/services/DataMigration"
import { City, State } from "../shared/services/pmo/restaurant"
import Box from "../shared/design/Box"
import Typography from "../shared/design/Typography"
import { Pressable } from "react-native"
import FavoritesSync from "../shared/services/pmo/favorite"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RestaurantsStackParamList {}
  }
}

export type RestaurantsStackParamList = {
  StateList: undefined
  CityList: {
    state: State
  }
  RestaurantList: {
    state: State
    city: City
  }
  RestaurantDetails: {
    state: State
    city: City
    slug: string
  }
  OrderCreate: {
    slug: string
  }
}

const RestaurantsStack = createStackNavigator<RestaurantsStackParamList>()
const RestaurantsNavigator: React.FC = () => {
  return (
    <RestaurantsStack.Navigator
      initialRouteName="StateList"
      screenOptions={{
        header: ({ route, navigation }) => {
          if (!navigation.canGoBack()) return null

          return (
            <Pressable onPress={navigation.goBack}>
              <Box
                padding="m"
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <Icon name="arrow-back" size={20} />
                <Typography variant="heading">
                  {/* @ts-ignore */}
                  {[route.params?.city?.name, route.params?.state?.name]
                    .filter(Boolean)
                    .join(", ")}
                </Typography>
              </Box>
            </Pressable>
          )
        },
      }}
    >
      <RestaurantsStack.Screen name="StateList" component={StateList} />
      <RestaurantsStack.Screen name="CityList" component={CityList} />
      <RestaurantsStack.Screen
        name="RestaurantList"
        component={RestaurantList}
      />
      <RestaurantsStack.Screen
        name="RestaurantDetails"
        component={RestaurantDetails}
      />
      <RestaurantsStack.Screen name="OrderCreate" component={RestaurantOrder} />
    </RestaurantsStack.Navigator>
  )
}

const AppTabs = createBottomTabNavigator()
const AppNavigator: React.FC = () => {
  const theme = useTheme()

  return (
    <AppTabs.Navigator
      initialRouteName="RestaurantsStack"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: theme.palette.screen.main,
        },
        headerTitleStyle: {
          color: theme.palette.screen.contrast,
          ...theme.typography.title,
        },
        tabBarStyle: {
          backgroundColor: theme.palette.screen.main,
        },
        // tabBarLabelStyle: { color: theme.palette.screen.contrast },
        tabBarActiveTintColor: theme.palette.primary.strong,
        tabBarInactiveTintColor: theme.palette.screen.contrast,
        tabBarIcon: ({ focused, color }) => {
          let icon = "settings"
          if (route.name === "Settings") {
            icon = focused ? "settings" : "settings-outline"
          } else if (route.name === "Restaurants") {
            icon = focused ? "restaurant" : "restaurant-outline"
          }

          return <Icon name={icon} size={20} color={color} />
        },
      })}
    >
      <AppTabs.Screen
        name="Restaurants"
        component={RestaurantsNavigator}
        options={{ title: "Place My Order" }}
      />
      <AppTabs.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings" }}
      />
    </AppTabs.Navigator>
  )
}

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: "100%", width: "100%" }}>
        <AuthProvider>
          <ThemeProvider>
            <DataMigration>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
              <FavoritesSync />
            </DataMigration>
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App
