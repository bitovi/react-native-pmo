import { CityListParams } from "../../../screens/CityList"
import { RestaurantDetailsParams } from "../../../screens/RestaurantDetails"
import { RestaurantListParams } from "../../../screens/RestaurantList"
import { RestaurantOrderParams } from "../../../screens/RestaurantOrder"
import { StateListParams } from "../../../screens/StateList"

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

export type StackScreenProps<
  ParamList extends Record<string, object | undefined>,
  RouteName extends keyof ParamList = keyof ParamList,
> = {
  route: Readonly<{
    params: Readonly<ParamList[RouteName]>
  }>
}
