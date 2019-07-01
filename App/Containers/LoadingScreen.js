import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoadingScreenStyle'

class LoadingScreen extends Component {

  render () {
    return (
      <View style={styles.container}>
        <Text>
          Welcome
        </Text>
        <Text>
          Welcome
        </Text>
        <Text>
          Welcome
        </Text>
        <Text>
          Welcome
        </Text>
        <Text>
          Welcome
        </Text>
        <Text>
          Welcome
        </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
