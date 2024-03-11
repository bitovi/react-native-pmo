import type { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import type { StaticScreenProps } from "@react-navigation/native"

type Props = StaticScreenProps<{
  restaurantId?: string
}>

const OrderCreate: FC<Props> = ({ route }) => {
  const { restaurantId } = route.params

  return (
    <View style={styles.container}>
      <Text>Place an order for Restaurant {restaurantId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default OrderCreate
