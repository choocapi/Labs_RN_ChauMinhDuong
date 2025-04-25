import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Project1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  )
}

export default Project1

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        backgroundColor: 'aqua',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
    },
})