import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/LoginStyle'

export default class Login extends Component {
  // Prop type warnings
  static propTypes = {
    fetching: PropTypes.bool,
    dispatch: PropTypes.func,
    attemptLogin: PropTypes.func
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.container} >
          <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
            <Image source={Images.logo} style={[styles.topLogo, this.state.topLogo]} />
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
    )
  }
}
