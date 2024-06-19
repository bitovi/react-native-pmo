import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

import { useTheme } from "@shared/design/theme"

type Ionicon = React.ComponentProps<typeof Ionicons>["name"]

const AppLayout: React.FC = () => {
  const theme = useTheme()

  return (
    <Tabs
      initialRouteName="choose"
      screenOptions={({ route }) => ({
        headerShown: false,
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
          let icon: Ionicon = "square-outline"
          if (route.name === "settings") {
            icon = focused ? "settings" : "settings-outline"
          } else if (route.name === "choose") {
            icon = focused ? "restaurant" : "restaurant-outline"
          }

          return <Ionicons name={icon} size={20} color={color} />
        },
      })}
    >
      <Tabs.Screen
        name="choose"
        options={{ headerShown: false, tabBarLabel: "Place My Order" }}
      />
      <Tabs.Screen
        name="settings"
        options={{ headerShown: true, tabBarLabel: "Settings" }}
      />
      <Tabs.Screen name="restaurants" options={{ href: null }} />
    </Tabs>
  )
}

export default AppLayout
