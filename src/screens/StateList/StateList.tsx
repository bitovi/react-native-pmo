import type { FC } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStates } from "../../services/restaurant/hook"
import { Box, Loading, Press, Typography } from "../../components"

const StateList: FC = () => {
  const navigation = useNavigation()
  const { data: states, error, isPending } = useStates()

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">Error loading states: {"\n"}</Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Box padding="s">
      <FlatList
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

export default StateList
