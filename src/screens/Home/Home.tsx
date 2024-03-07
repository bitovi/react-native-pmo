import type { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

const Home: FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Find a restaurant"
        onPress={() => navigation.navigate("RestaurantList")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffd",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home