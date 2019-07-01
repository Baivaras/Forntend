import React, { Component } from 'react'
import { ScrollView, Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation, 
  View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import saveToken from '../Utils/Storage'
import { NavigationActions, StackActions } from 'react-navigation';
import LoginActions from '../Redux/LoginRedux'
import PropTypes from 'prop-types';
import {Images, Metrics} from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.isAttempting = false
  }

  // Prop type warnings
  static propTypes = {
    fetching: PropTypes.bool,
    dispatch: PropTypes.func,
    attemptLogin: PropTypes.func
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      this.props.navigation.goBack()
    }
  }

  handlePressLogin = () => {
    const { username, password } = this.state

    this.setState({
      isAttempting: true,
    })
    this.props.attemptLogin(username, password)     // dispatch login request
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  render() {
    const { username, password } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.container} >
            <ScrollView contentContainerStyle={{ justifyContent: 'center' }} style={[styles.container, { height: this.state.visibleHeight }]} keyboardShouldPersistTaps='always'>
              {/* <Image source={Images.logo} style={[styles.topLogo, this.state.topLogo]} /> */}
              <View style={styles.form}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Username</Text>
                  <TextInput
                    ref='username'
                    style={textInputStyle}
                    value={username}
                    editable={editable}
                    keyboardType='default'
                    returnKeyType='next'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.handleChangeUsername}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => this.refs.password.focus()}
                    placeholder='Username' />
                </View>

                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Password</Text>
                  <TextInput
                    ref='password'
                    style={textInputStyle}
                    value={password}
                    editable={editable}
                    keyboardType='default'
                    returnKeyType='go'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry
                    onChangeText={this.handleChangePassword}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={this.handlePressLogin}
                    placeholder='Password' />
                </View>

                <View style={[styles.loginRow]}>
                  <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.handlePressLogin}>
                    <View style={styles.loginButton}>
                      <Text style={styles.loginText}>Sign In</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
