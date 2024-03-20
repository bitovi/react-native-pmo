import type { FC } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StaticScreenProps } from "@react-navigation/native"
import { useCities } from "../../services/restaurant/hook"
import { Box, Loading, Press, Typography } from "../../components"

type Props = StaticScreenProps<{
  state: string
}>

const CityList: FC<Props> = ({ route }) => {
  const { state } = route.params
  const navigation = useNavigation()
  const { data: cities, error, isPending } = useCities(state || "")

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">Error loading cities: {"\n"}</Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Box padding="m">
      <FlatList
        data={cities}
        renderItem={({ item: cityItem }) => (
          <Press
            style={{ margin: 0 }}
            title={cityItem.name}
            onPress={() =>
              navigation.navigate("RestaurantList", {
                state,
                city: cityItem.name,
              })
            }
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </Box>
  )
}

export default CityList
