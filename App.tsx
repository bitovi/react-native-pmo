import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import OrderCreate from './src/screens/OrderCreate';
import RestaurantList from './src/screens/RestaurantList';
import RestaurantDetails from './src/screens/RestaurantDetails';
import { registerRootComponent } from 'expo';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home',
      },
    },
    OrderCreate: {
      screen: OrderCreate,
      options: {
        title: 'Order',
      },
    },
    RestaurantList: {
      screen: RestaurantList,
      options: {
        title: 'Find a restaurant',
      },
    },
    RestaurantDetails: {
      screen: RestaurantDetails,
      options: {
        title: 'Details',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}

registerRootComponent(App)