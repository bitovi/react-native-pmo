import { FlatList } from "react-native"

import Loading from "@shared/components/Loading"
import Box from "@shared/design/Box"
import LinkButton from "@shared/design/LinkButton"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"
import { useStates } from "@shared/services/pmo/restaurant"

export interface StateListProps {}

const StateList: React.FC<StateListProps> = () => {
  const { data: states, error, isPending } = useStates()

  if (error) {
    return (
      <Screen title="Choose a State">
        <Box padding="s">
          <Typography variant="heading">Error loading states: </Typography>
          <Typography variant="body">{error.message}</Typography>
        </Box>
      </Screen>
    )
  }

  if (isPending) {
    return (
      <Screen title="Choose a State">
        <Loading />
      </Screen>
    )
  }

  return (
    <Screen noScroll title="Choose a State">
      <FlatList
        data={states}
        renderItem={({ item: state }) => (
          <LinkButton href={`/choose/${state.short}`}>{state.name}</LinkButton>
        )}
        keyExtractor={(item) => item.short}
      />
    </Screen>
  )
}

export default StateList
