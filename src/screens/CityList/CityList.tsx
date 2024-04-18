import type { FC } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StaticScreenProps } from "@react-navigation/native"
import { useCities } from "../../services/pmo/restaurant"
import Box from "../../components/Box"
import Loading from "../../components/Loading"
import Press from "../../components/Press"
import Typography from "../../components/Typography"

export type Props = StaticScreenProps<{
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
