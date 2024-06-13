import { useNavigation } from "@react-navigation/native"
// import { StackScreenProps } from "@react-navigation/stack"
import { FlatList } from "react-native"

import { RestaurantsStackParamList, StackScreenProps } from "../../OldApp"
import Loading from "../../shared/components/Loading"
import Box from "../../shared/design/Box"
import Button from "../../shared/design/Button"
import Screen from "../../shared/design/Screen"
import Typography from "../../shared/design/Typography"
import { State, useCities } from "../../shared/services/pmo/restaurant"

export interface CityListParams {
  state: State
}

export interface CityListProps
  extends StackScreenProps<RestaurantsStackParamList, "CityList"> {}

const CityList: React.FC<CityListProps> = ({ route }) => {
  const { state } = route.params
  const navigation = useNavigation()
  const { data: cities, error, isPending } = useCities(state.short || "")

  if (error) {
    return (
      <Screen>
        <Box padding="s">
          <Typography variant="heading">Error loading cities: </Typography>
          <Typography variant="body">{error.message}</Typography>
        </Box>
      </Screen>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Screen noScroll>
      <FlatList
        data={cities}
        renderItem={({ item: cityItem }) => (
          <Button
            onPress={() =>
              navigation.navigate("RestaurantList", {
                state,
                city: cityItem,
              })
            }
          >
            {cityItem.name}
          </Button>
        )}
        keyExtractor={(item) => item.name}
      />
    </Screen>
  )
}

export default CityList
