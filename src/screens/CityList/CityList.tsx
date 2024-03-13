import type { FC } from "react"
import { FlatList, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StaticScreenProps } from "@react-navigation/native"
import { useCities } from "../../services/restaurant/hook"
import { Box, Press, Typography } from "../../components"

type Props = StaticScreenProps<{
  state: string
}>

const CityList: FC<Props> = ({ route }) => {
  const { state } = route.params
  const navigation = useNavigation()
  const { data: cities, error, isPending } = useCities(state || "")

  if (error) {
    return (
      <Box padding="s" style={styles.container}>
        <Typography variant="heading">Error loading cities: {"\n"}</Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return (
      <Box padding="s" style={styles.container}>
        <Typography variant="heading">Loading…</Typography>
      </Box>
    )
  }

  return (
    <Box padding="m" style={styles.container}>
      <FlatList
        style={styles.options}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf",
    alignItems: "flex-start",
    overflow: "scroll",
  },
  options: {
    flexDirection: "row",
  },
})

export default CityList
