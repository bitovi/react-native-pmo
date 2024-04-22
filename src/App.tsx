import "react-native-gesture-handler"
import type { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/Ionicons"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import ThemeProvider, { theme } from "./theme"
import AuthProvider from "./services/auth"
import Settings from "./screens/Settings"
import StateList from "./screens/StateList"
import CityList from "./screens/CityList"
import RestaurantDetails from "./screens/RestaurantDetails"
import RestaurantList from "./screens/RestaurantList"
import RestaurantOrder from "./screens/RestaurantOrder"
import DataMigration from "./services/DataMigration"
import type { City, State } from "./services/pmo/restaurant"
import Box from "./components/Box"
import { Typography } from "./components"
import { Pressable } from "react-native"
import { FavoritesSync } from "./services/pmo/favorite"

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

const RestaurantsNavigation = createStackNavigator<RestaurantsStackParamList>()
const RestaurantsStackNavigation = () => {
  return (
    <RestaurantsNavigation.Navigator
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
      <RestaurantsNavigation.Screen name="StateList" component={StateList} />
      <RestaurantsNavigation.Screen name="CityList" component={CityList} />
      <RestaurantsNavigation.Screen
        name="RestaurantList"
        component={RestaurantList}
      />
      <RestaurantsNavigation.Screen
        name="RestaurantDetails"
        component={RestaurantDetails}
      />
      <RestaurantsNavigation.Screen
        name="OrderCreate"
        component={RestaurantOrder}
      />
    </RestaurantsNavigation.Navigator>
  )
}

const Tab = createBottomTabNavigator()
export const RootTabNavigator: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="RestaurantsStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = "settings"
          if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline"
          } else if (route.name === "RestaurantsStack") {
            iconName = focused ? "restaurant" : "restaurant-outline"
          }
          return (
            <Icon
              name={iconName}
              size={20}
              color={focused ? theme.colors.success : theme.colors.text}
            />
          )
        },
        tabBarActiveTintColor: theme.colors.success,
      })}
    >
      <Tab.Screen
        name="RestaurantsStack"
        component={RestaurantsStackNavigation}
        options={{ title: "Place My Order" }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  )
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RestaurantsStackParamList {}
  }
}

const AppNavigator: FC = () => {
  return (
    <NavigationContainer>
      <RootTabNavigator />
    </NavigationContainer>
  )
}

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SafeAreaView style={{ height: "100%", width: "100%" }}>
          <DataMigration>
            <AuthProvider>
              <AppNavigator />
              <FavoritesSync />
            </AuthProvider>
          </DataMigration>
        </SafeAreaView>

      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
