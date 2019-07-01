
import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const NotLoggedInStackNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: { title: 'Login' }
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(NotLoggedInStackNavigator)