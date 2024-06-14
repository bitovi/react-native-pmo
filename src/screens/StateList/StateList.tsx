import { FlatList } from "react-native"

import Loading from "../../shared/components/Loading"
import Box from "../../shared/design/Box"
import Button from "../../shared/design/Button"
import Screen from "../../shared/design/Screen"
import Typography from "../../shared/design/Typography"
import { useStates } from "../../shared/services/pmo/restaurant"

export interface StateListProps {}

const StateList: React.FC<StateListProps> = () => {
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
        renderItem={({ item: state }) => (
          <Button href={`/choose/${state.short}`}>{state.name}</Button>
        )}
        keyExtractor={(item) => item.short}
      />
    </Screen>
  )
}

export default StateList
