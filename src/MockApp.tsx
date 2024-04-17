import type { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import AuthProvider from "./services/auth/auth"

const MockNavigation = createStackNavigator()
const MockApp: FC<{ component: FC<any>, params?: Partial<object | undefined>}> = ({ component, params }) => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MockNavigation.Navigator
          initialRouteName="test"
        >
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