import { Pressable, StyleSheet } from "react-native"
import Typography from "../Typography"
import Box from "../Box"
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"

type Props = {
  title: string
}

const RestaurantSelectHeader: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation()

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Box style={styles.restaurantSelectHeader}>
        <Icon name="arrow-back-outline" size={20} />
        <Typography variant="heading" style={styles.title}>
          {title}
        </Typography>
      </Box>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  restaurantSelectHeader: {
    height: 50,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
  },
  title: {},
})

export default RestaurantSelectHeader
