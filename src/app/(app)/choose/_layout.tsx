import { Stack } from "expo-router"

const ChooseLayout: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
        // header: ({ route, navigation }) => {
        //   if (!navigation.canGoBack()) return null
        //
        //   return (
        //     <Pressable onPress={navigation.goBack}>
        //       <Box
        //         padding="m"
        //         style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
        //       >
        //         <Icon name="arrow-back" size={20} />
        //         <Typography variant="heading">
        //           {/* @ts-ignore */}
        //           {[route.params?.city?.name, route.params?.state?.name]
        //             .filter(Boolean)
        //             .join(", ")}
        //         </Typography>
        //       </Box>
        //     </Pressable>
        //   )
        // },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[state]/index" />
      <Stack.Screen name="[state]/[city]/index" />
    </Stack>
  )
}

export default ChooseLayout
