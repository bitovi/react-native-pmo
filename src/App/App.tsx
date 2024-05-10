import "react-native-gesture-handler"

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/Ionicons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"

import ThemeProvider, { useTheme } from "../shared/design/theme"
import AuthProvider from "../shared/services/auth"
import DataMigration from "../shared/services/DataMigration"
import FavoritesSync from "../shared/services/pmo/favorite"

import Settings from "../screens/Settings"

import RestaurantsNavigator from "./navigators/RestaurantsNavigator"

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: "100%", width: "100%" }}>
        <ThemeProvider>
          <AuthProvider>
            <DataMigration>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
              <FavoritesSync />
            </DataMigration>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App

const Tabs = createBottomTabNavigator()

const AppNavigator: React.FC = () => {
  const theme = useTheme()

  return (
    <Tabs.Navigator
      initialRouteName="Restaurants"
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
      <Tabs.Screen
        name="Restaurants"
        component={RestaurantsNavigator}
        options={{ title: "Place My Order" }}
      />
      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings" }}
      />
    </Tabs.Navigator>
  )
}
