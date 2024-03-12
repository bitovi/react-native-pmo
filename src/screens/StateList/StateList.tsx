import type { FC } from "react"
import { FlatList, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStates } from "../../services/restaurant/hook"
import { Box, Press, Typography } from "../../components"

const StateList: FC = () => {
  const navigation = useNavigation()
  const { data: states, error, isPending } = useStates()

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
      <Typography variant="heading">Select a State:</Typography>
      <FlatList
        style={styles.options}
        data={states}
        renderItem={({ item: stateItem }) => (
          <Press
            title={stateItem.name}
            onPress={() =>
              navigation.navigate("CityList", {
                state: stateItem.short,
              })
            }
          />
        )}
        keyExtractor={(item) => item.short}
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

export default StateList
