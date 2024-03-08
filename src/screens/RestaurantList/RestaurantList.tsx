import type { FC } from "react"
import { useState } from "react"
import { Button, FlatList, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import ListItem from "../../components/ListItem/ListItem"
import { useCities, useRestaurants, useStates } from "../../services/restaurant/hook"
import { Box, Typography } from "../../components"

const RestaurantList: FC = () => {
  const navigation = useNavigation()
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const { data: states, isPending: isPendingStates } = useStates()
  const { data: cities, isPending: isPendingCities } = useCities(state || "")
  const { data, error, isPending } = useRestaurants(state, city)

  const handleChangeState = (state: string) => {
    setState(state)
    setCity("")
  }

  const handleChangeCity = (city: string) => {
    setCity(city)
  }

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
    <Box style={styles.container}>
      <Box margin='m'>
        <Typography variant="h2">Restaurants in {city} {state}</Typography>
      </Box>
      <Box fullWidth padding="m">
        <Typography variant="h2">Select a state:</Typography>
        {isPendingStates
          ? <Typography variant="h4">Loading...</Typography>
          : <FlatList
            style={styles.options}
            data={states}
            renderItem={({ item: stateItem }) => (
              <Button
                title={stateItem.name}
                onPress={() => handleChangeState(stateItem.short)}
              />
            )}
            keyExtractor={(item) => item.short}
          />
        }
      </Box>
      {state && (
        <Box fullWidth padding="m">
          <Typography variant="h2">Select a city:</Typography>
          {isPendingCities
            ? <Typography variant="h4">Loading...</Typography>
            : <FlatList
              style={styles.options}
              data={cities}
              renderItem={({ item: cityItem }) => (
                <Button
                  title={cityItem.name}
                  onPress={() => handleChangeCity(cityItem.name)}
                />
              )}
              keyExtractor={(item) => item.name}
            />
          }
        </Box>
      )}
      {city && (
        <Box fullWidth padding="m">
          <Typography variant="h2">Restaurants:</Typography>
          {isPending
            ? <Typography variant="h4">Loading...</Typography>
            : <FlatList
              data={data}
              renderItem={({ item: restaurant }) => (
                <ListItem
                  image={restaurant.images.thumbnail}
                  onPress={() => navigation.navigate("RestaurantDetails", { slug: restaurant.slug })}
                >
                  <Text>{restaurant.name}</Text>
                </ListItem>
              )}
              style={styles.list}
              keyExtractor={(item) => item._id}
            />
          }
        </Box>
      )}
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fdf",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "scroll",
  },
  list: {
    maxHeight: 200,
  },
  options: {
    maxHeight: 200,
    width: "100%",
    flexDirection: "row",
  },
})

export default RestaurantList
