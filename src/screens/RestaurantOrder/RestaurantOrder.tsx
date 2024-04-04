import type { FC } from "react"
import { useEffect, useState } from "react"
import { ScrollView, Switch } from "react-native"
import type { StaticScreenProps } from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
import { useRestaurant } from "../../services/pmo/restaurant"
import {
  Box,
  Typography,
  Press,
  FormTextField,
  Loading,
} from "../../components"
import Card from "../../components/Card"
import useTheme from "../../theme/useTheme"

type Props = StaticScreenProps<{
  restaurantId: string
}>

type OrderItems = Record<string, number>

const RestaurantOrder: FC<Props> = ({ route }) => {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const { restaurantId } = route.params

  const { data: restaurant, error, isPending } = useRestaurant(restaurantId)

  const [address, setAddress] = useState<string>("")
  const [items, setItems] = useState<OrderItems>({})
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")

  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({ title: `Order from ${restaurant.name}` })
    }
  }, [restaurant, navigation])

  const handleSubmit = () => {
    alert("Order submitted!")
  }

  const setItem = (itemId: string, isChecked: boolean, itemPrice: number) => {
    return setItems((currentItems) => {
      const updatedItems = {
        ...currentItems,
      }
      if (isChecked) {
        updatedItems[itemId] = itemPrice
      } else {
        delete updatedItems[itemId]
      }
      return updatedItems
    })
  }

  const selectedCount = Object.values(items).length
  const subtotal = calculateTotal(items)

  function calculateTotal(items: OrderItems) {
    return Object.values(items).reduce((total, itemPrice) => {
      return total + itemPrice
    }, 0)
  }

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">
          Error loading restaurant order: {"\n"}
        </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  if (!restaurant) {
    return (
      <Box padding="s">
        <Typography variant="heading">Restaurant not found</Typography>
      </Box>
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <Box padding="s">
        <Card headline="Lunch Menu">
          {restaurant.menu.lunch.map(({ name, price }) => (
            <Box
              key={name}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 8,
              }}
            >
              <Typography variant="body">
                {name}
                {"\n"}
                {price}
              </Typography>
              <Switch
                onValueChange={(value) => setItem(name, value, price)}
                value={name in items}
                thumbColor="white"
                trackColor={{
                  true: theme.colors.success,
                  false: theme.colors.background,
                }}
              ></Switch>
            </Box>
          ))}
        </Card>

        <Card headline="Dinner Menu">
          {restaurant.menu.dinner.map(({ name, price }) => (
            <Box
              key={name}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 8,
              }}
            >
              <Typography variant="body">
                {name}
                {"\n"}
                {price}
              </Typography>
              <Switch
                onValueChange={(value) => setItem(name, value, price)}
                value={name in items}
                thumbColor="white"
                trackColor={{
                  true: theme.colors.success,
                  false: theme.colors.background,
                }}
              ></Switch>
            </Box>
          ))}
        </Card>

        <Card headline="Order Details">
          <FormTextField label="Name" onChange={setName} value={name} />
          <FormTextField
            label="Address"
            onChange={setAddress}
            value={address}
          />
          <FormTextField label="Phone" onChange={setPhone} value={phone} />
        </Card>

        <Box padding="s">
          {subtotal === 0 ? (
            <Typography>Please choose an item.</Typography>
          ) : (
            <Typography>{selectedCount} items selected.</Typography>
          )}
        </Box>

        <Box padding="s">
          <Typography variant="heading">
            Total: ${subtotal ? subtotal.toFixed(2) : "0.00"}
          </Typography>
        </Box>

        <Box padding="s">
          <Press title="Place My Order!" onPress={handleSubmit} />
        </Box>
        <Box padding="l">{/* Keyboard space */}</Box>
      </Box>
    </ScrollView>
  )
}

export default RestaurantOrder
