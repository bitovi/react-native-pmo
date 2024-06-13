import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import AuthProvider from "../shared/services/auth"

const MockNavigation = createStackNavigator()

const MockApp: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<any>
  params?: Partial<object | undefined>
}> = ({ component, params }) => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MockNavigation.Navigator initialRouteName="test">
          <MockNavigation.Screen
            name="test"
            component={component}
            initialParams={params}
          />
        </MockNavigation.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}

export default MockApp
