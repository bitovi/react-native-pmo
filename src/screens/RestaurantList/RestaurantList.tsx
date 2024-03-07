import type { FC } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RestaurantList: FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Restaurant List:</Text>
      <FlatList
        data={[{ id: "1", name: "Restaurant 1" }, { id: "2", name: "Restaurant 2" }]}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => {
              navigation.navigate('RestaurantDetails', { id: item.id });
            }}
          />
        )}
        style={styles.list}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    maxHeight: 200,
  }
});

export default RestaurantList