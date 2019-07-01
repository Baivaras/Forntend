import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { Button } from 'react-native-elements'
import { RoundedButton } from '../Components/RoundedButton'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {


  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              Welcome to Oasis Living!
            </Text>
          </View>
          <RoundedButton
            title="Solid Button"
            onPress=
          />
          <DevscreensButton />
        </ScrollView>
      </View>
    )
  }
}
