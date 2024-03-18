import type { FC } from "react"
import { useState } from "react"
import { FlatList, StyleSheet, Switch } from "react-native"
import type { StaticScreenProps } from "@react-navigation/native"
import { useRestaurant } from "../../services/restaurant/hook"
import { Box, Typography, Press } from "../../components"
import type { Item } from "../../services/restaurant"
import RestaurantHeader from "../../components/RestaurantHeader"

type Props = StaticScreenProps<{
  restaurantId: string
}>

type OrderItems = Record<string, number>

const RestaurantOrder: FC<Props> = ({ route }) => {
  const { restaurantId } = route.params

  const { data: restaurant, error, isPending } = useRestaurant(restaurantId)

  const [address, setAddress] = useState<string>("")
  const [items, setItems] = useState<OrderItems>({})
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")

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

  const setValue = (key: string, value: string) => {
    return setNewOrder((newOrder) => {
      return {
        ...newOrder,
        [key]: value,
      }
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
      <Box padding="s" style={styles.container}>
        <Typography variant="heading">
          Error loading restaurant order: {"\n"}
        </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return (
      <Box padding="s" style={styles.container}>
        <Typography variant="heading">Loading…</Typography>
      </Box>
    )
  }

  return (
    <Box style={styles.container}>
      <RestaurantHeader restaurant={restaurant} />
      <Box style={styles.container}>
        <Typography variant="heading">
          Order from {restaurant?.name}!
        </Typography>

        <form onSubmit={(event) => handleSubmit(event)}>
          {subtotal === 0 ? (
            <p className="info text-error">Please choose an item.</p>
          ) : (
            <p className="info text-success">{selectedCount} selected.</p>
          )}

          <Typography variant="heading">Lunch Menu</Typography>
          <FlatList
            data={restaurant?.menu.lunch}
            renderItem={({ name, price }) => {
              ;<>
                <Switch
                  onValueChange={setItem(name, price)}
                  value={name in items}
                ></Switch>
                <Typography variant="body">
                  {name} {price}
                </Typography>
              </>
            }}
          />

          <Typography variant="heading">Dinner Menu</Typography>
          <FlatList
            data={restaurant?.menu.dinner}
            renderItem={({ name, price }) => {
              ;<>
                <Switch
                  onValueChange={setItem(name, price)}
                  value={name in items}
                ></Switch>
                <Typography variant="body">
                  {name} {price}
                </Typography>
              </>
            }}
          />

          <FormTextField
            label="Name"
            onChange={setName}
            type="text"
            value={name}
          />
          <FormTextField
            label="Address"
            onChange={setAddress}
            type="text"
            value={address}
          />
          <FormTextField
            label="Phone"
            onChange={setPhone}
            type="tel"
            value={phone}
          />

          <Box>
            <Typography variant="heading">
              Total: ${subtotal ? subtotal.toFixed(2) : "0.00"}
            </Typography>
            <Press title="Place My Order!" onPress={handleSubmit} />
          </Box>
        </form>
      </Box>
    </Box>
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

export default RestaurantOrder
