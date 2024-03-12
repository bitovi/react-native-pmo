import type { FC } from "react"
import { FlatList, StyleSheet, Text } from "react-native"
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
      <Box style={styles.container}>
        <Text>Error: {error.message}</Text>
      </Box>
    )
  }

  if (isPending) {
    return (
      <Box style={styles.container}>
        <Text>Loading...</Text>
      </Box>
    )
  }

  return (
    <Box padding="m" style={styles.container}>
      <Typography variant="heading">Select a City: </Typography>
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
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  options: {
    flexDirection: "row",
  },
})

export default CityList
