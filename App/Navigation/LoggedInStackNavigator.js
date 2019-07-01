import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'
// import AnotherAuthenticatedScreen from '../Containers/AnotherAuthenticatedScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const LoggedInStackNavigator = createStackNavigator({
    HomeScreen: {
    screen: HomeScreen
  },
//   AnotherAuthenticatedScreen: { screen: AnotherAuthenticatedScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(LoggedInStackNavigator)