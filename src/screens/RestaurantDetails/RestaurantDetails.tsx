import type { FC } from "react"
import { Button, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import RestaurantHeader from "../../components/RestaurantHeader"
import { restaurantWithAddress } from "../../components/RestaurantHeader/mocks"
import type { StaticScreenProps } from "@react-navigation/native"
import { Box } from "../../components"

type Props = StaticScreenProps<{
  slug: string
}>

const RestaurantDetails: FC<Props> = ({ route }) => {
  const { slug } = route.params
  const navigation = useNavigation()

  return (
    <Box style={styles.container}>
      <Text>Details for Restaurant {slug}</Text>
      <RestaurantHeader restaurant={restaurantWithAddress} />
      <Button
        title="Place an order"
        onPress={() => {
          navigation.navigate("OrderCreate", { restaurantId: slug })
        }}
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dff",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default RestaurantDetails
