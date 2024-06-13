import { createStackNavigator } from "@react-navigation/stack"
import { Pressable } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

import CityList, { CityListParams } from "../../../screens/CityList"
import RestaurantDetails, {
  RestaurantDetailsParams,
} from "../../../screens/RestaurantDetails"
import RestaurantList, {
  RestaurantListParams,
} from "../../../screens/RestaurantList"
import RestaurantOrder, {
  RestaurantOrderParams,
} from "../../../screens/RestaurantOrder"
import StateList, { StateListParams } from "../../../screens/StateList"
import Box from "../../../shared/design/Box"
import Typography from "../../../shared/design/Typography"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RestaurantsStackParamList {}
  }
}

export type RestaurantsStackParamList = {
  StateList: StateListParams
  CityList: CityListParams
  RestaurantList: RestaurantListParams
  RestaurantDetails: RestaurantDetailsParams
  RestaurantOrder: RestaurantOrderParams
}

const Stack = createStackNavigator<RestaurantsStackParamList>()

const RestaurantsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
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
      <Stack.Screen name="StateList" component={StateList} />
      <Stack.Screen name="CityList" component={CityList} />
      <Stack.Screen name="RestaurantList" component={RestaurantList} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen name="RestaurantOrder" component={RestaurantOrder} />
    </Stack.Navigator>
  )
}

export default RestaurantsNavigator
