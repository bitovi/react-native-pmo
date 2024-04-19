import type { FC } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStates } from "../../services/pmo/restaurant"
import Box from "../../design/Box"
import Loading from "../../components/Loading"
import Button from "../../design/Button"
import Typography from "../../design/Typography"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RestaurantsStackParamList } from "../../App"
import Screen from "../../design/Screen"

type Props = StackScreenProps<RestaurantsStackParamList, "StateList">

const StateList: FC<Props> = () => {
  const navigation = useNavigation()
  const { data: states, error, isPending } = useStates()

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">Error loading states: </Typography>
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
        data={states}
        renderItem={({ item: stateItem }) => (
          <Button
            onPress={() => {
              navigation.navigate("CityList", {
                state: stateItem,
              })
            }}
          >
            {stateItem.name}
          </Button>
        )}
        keyExtractor={(item) => item.short}
      />
    </Screen>
  )
}

export default StateList
