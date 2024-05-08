import type { FC } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStates } from "../../shared/services/pmo/restaurant"
import Box from "../../shared/design/Box"
import Loading from "../../shared/components/Loading"
import Button from "../../shared/design/Button"
import Typography from "../../shared/design/Typography"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RestaurantsStackParamList } from "../../App"
import Screen from "../../shared/design/Screen"

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
