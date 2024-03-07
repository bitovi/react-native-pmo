import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const OrderCreate: FC = ({ route }) => {
  const { restaurantId } = route.params;

  return (
    <View style={styles.container}>
      <Text>Place an order for Restaurant {restaurantId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OrderCreate