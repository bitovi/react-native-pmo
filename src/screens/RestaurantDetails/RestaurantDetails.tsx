import type { FC } from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import RestaurantHeader from "../../components/RestaurantHeader"
import { restaurantWithAddress } from "../../components/RestaurantHeader/mocks"
import type { StaticScreenProps } from "@react-navigation/native"

type Props = StaticScreenProps<{
  id: string
}>

const RestaurantDetails: FC<Props> = ({ route }) => {
  const { id } = route.params
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text>Restaurant Details for Restaurant {id}</Text>
      <RestaurantHeader restaurant={restaurantWithAddress} />
      <Button
        title="Place an order"
        onPress={() => {
          navigation.navigate("OrderCreate", { restaurantId: id })
        }}
      />
    </View>
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
