import { FlatList } from "react-native"

import Loading from "@shared/components/Loading"
import Box from "@shared/design/Box"
import Button from "@shared/design/Button"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"
import { useCities } from "@shared/services/pmo/restaurant"

export interface CityListProps {
  state: string
}

const CityList: React.FC<CityListProps> = ({ state }) => {
  const { data: cities, error, isPending } = useCities(state)

  if (error) {
    return (
      <Screen>
        <Box padding="s">
          <Typography variant="heading">Error loading cities: </Typography>
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
        data={cities}
        renderItem={({ item: city }) => (
          <Button href={`/choose/${state}/${city.name}`}>{city.name}</Button>
        )}
        keyExtractor={(item) => item.name}
      />
    </Screen>
  )
}

export default CityList
