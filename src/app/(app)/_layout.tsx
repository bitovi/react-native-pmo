import { Tabs } from "expo-router"

// import { useTheme } from "@shared/design/theme"

const AppLayout: React.FC = () => {
  // const theme = useTheme()

  return (
    <Tabs
      initialRouteName="choose"
      screenOptions={{ headerShown: false }}
      // screenOptions={({ route }) => ({
      //   headerStyle: {
      //     backgroundColor: theme.palette.screen.main,
      //   },
      //   headerTitleStyle: {
      //     color: theme.palette.screen.contrast,
      //     ...theme.typography.title,
      //   },
      //   tabBarStyle: {
      //     backgroundColor: theme.palette.screen.main,
      //   },
      //   tabBarActiveTintColor: theme.palette.primary.strong,
      //   tabBarInactiveTintColor: theme.palette.screen.contrast,
      //   tabBarIcon: ({ focused, color }) => {
      //     let icon = "settings"
      //     if (route.name === "Settings") {
      //       icon = focused ? "settings" : "settings-outline"
      //     } else if (route.name === "Restaurants") {
      //       icon = focused ? "restaurant" : "restaurant-outline"
      //     }
      //
      //     return <Icon name={icon} size={20} color={color} />
      //   },
      // })}
    >
      <Tabs.Screen name="choose" options={{ title: "Place My Order" }} />
      <Tabs.Screen name="settings" options={{ headerShown: true }} />
      <Tabs.Screen name="restaurants" options={{ href: null }} />
    </Tabs>
  )
}

export default AppLayout
