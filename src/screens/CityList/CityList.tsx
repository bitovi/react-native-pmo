import type { FC } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { useCities } from "../../shared/services/pmo/restaurant"
import Box from "../../shared/design/Box"
import Loading from "../../shared/components/Loading"
import Button from "../../shared/design/Button"
import Typography from "../../shared/design/Typography"

import type { StackScreenProps } from "@react-navigation/stack"
import type { RestaurantsStackParamList } from "../../App"
import Screen from "../../shared/design/Screen"

type Props = StackScreenProps<RestaurantsStackParamList, "CityList">

const CityList: FC<Props> = ({ route }) => {
  const { state } = route.params
  const navigation = useNavigation()
  const { data: cities, error, isPending } = useCities(state.short || "")

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">Error loading cities: </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Screen>
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
