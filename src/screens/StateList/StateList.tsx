import type { FC } from "react"
import { FlatList, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStates } from "../../services/restaurant/hook"
import { Box, Press, Typography } from "../../components"

const StateList: FC = () => {
  const navigation = useNavigation()
  const { data: states, error, isPending } = useStates()

  if (error) {
    return (
      <Box padding="s" style={styles.container}>
        <Typography variant="heading">Error loading states: {"\n"}</Typography>
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
    <Box padding="s" style={styles.container}>
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
    alignItems: "flex-start",
    overflow: "scroll",
  },
  options: {
    flexDirection: "row",
  },
})

export default StateList
