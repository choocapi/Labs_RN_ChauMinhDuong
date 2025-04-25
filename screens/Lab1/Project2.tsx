import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Project2 = () => {
    const handleAlert = ({title, content}: any) => {
        Alert.alert(title, content);
    }
  return (
    <View style={styles.container}>
      <Button title='Button 1' onPress={() => handleAlert({title: 'Button 1', content: 'hello!'})} />
        <TouchableOpacity onPress={() => handleAlert({title: 'Button 2', content: 'hello2!'})} style={styles.button}>
            <Text style={styles.text}>Button 2</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Project2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
    },
    text: {
        color: 'blue',
        fontSize: 18,
    }
})