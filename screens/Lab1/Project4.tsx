import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Button = (props: any) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.button, ...props.buttonStyle}}>
            <Text style={{...styles.text, ...props.textStyle}}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const Project4 = () => {
    const [pressCount, setPressCount] = useState(0);
    const handlePress = () => {
        setPressCount(pressCount + 1);
    }
  return (
    <View style={styles.container}>
        <Text>You've pressed the button: {pressCount} times</Text>
      <Button title={`Pressed ${pressCount} time(s)`} onPress={handlePress} textStyle={{color: 'blue'}} />
    </View>
  )
}

export default Project4

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
    }
})