import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Square = ({text, bgColor = "#7ce0f9"}: any) => {
    return (
        <View style={[styles.box, {backgroundColor: bgColor}]}>
            <Text>{text}</Text>
        </View>
    )
}

const Project5 = () => {
  return (
    <View style={styles.container}>
      <Square text="Square 1" />
      <Square text="Square 2" bgColor="blue" />
      <Square text="Square 3" bgColor="green" />
    </View>
  )
}

export default Project5

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
    box: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }
})