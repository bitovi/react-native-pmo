import { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"

import FormSwitch from "../../shared/components/FormSwitch"
import FormTextField from "../../shared/components/FormTextField"
import Loading from "../../shared/components/Loading"
import Box from "../../shared/design/Box"
import Button from "../../shared/design/Button"
import Card from "../../shared/design/Card"
import Screen from "../../shared/design/Screen"
import Typography from "../../shared/design/Typography"
import { useRestaurant } from "../../shared/services/pmo/restaurant"

import { RestaurantsStackParamList } from "../../App"

export interface RestaurantOrderParams {
  slug: string
}

export interface RestaurantOrderProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantOrder"> {}

type OrderItems = Record<string, number>

const RestaurantOrder: React.FC<RestaurantOrderProps> = ({ route }) => {
  const navigation = useNavigation()
  const { slug } = route.params

  const { data: restaurant, error, isPending } = useRestaurant(slug)

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
          Error loading restaurant order:{" "}
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
      <Screen>
        <Card title="Lunch Menu">
          {restaurant.menu.lunch.map(({ name, price }) => (
            <FormSwitch
              key={name}
              label={`${name} ($${price})`}
              value={name in items}
              onChange={(value) => setItem(name, value, price)}
            />
          ))}
        </Card>

        <Card title="Dinner Menu">
          {restaurant.menu.dinner.map(({ name, price }) => (
            <FormSwitch
              key={name}
              label={`${name} ($${price})`}
              value={name in items}
              onChange={(value) => setItem(name, value, price)}
            />
          ))}
        </Card>

        <Card title="Order Details">
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
            Total: ${subtotal.toFixed(2)}
          </Typography>
        </Box>

        <Box padding="s">
          <Button onPress={handleSubmit}>Place My Order!</Button>
        </Box>
      </Screen>
    </ScrollView>
  )
}

export default RestaurantOrder
