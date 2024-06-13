import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../OldApp"
import Loading from "../../shared/components/Loading"
import Box from "../../shared/design/Box"
import Button from "../../shared/design/Button"
import Screen from "../../shared/design/Screen"
import Typography from "../../shared/design/Typography"
import { useStates } from "../../shared/services/pmo/restaurant"

export interface StateListParams {}

export interface StateListProps
  extends StackScreenProps<RestaurantsStackParamList, "StateList"> {}

const StateList: React.FC<StateListProps> = () => {
  const navigation = useNavigation()
  const { data: states, error, isPending } = useStates()

  if (error) {
    return (
      <Screen>
        <Box padding="s">
          <Typography variant="heading">Error loading states: </Typography>
          <Typography variant="body">{error.message}</Typography>
        </Box>
      </Screen>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Screen noScroll>
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
