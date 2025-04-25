import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = (props: any) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.button, ...props.buttonStyle}}>
            <Text style={{color: '#fff'}}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const Project3 = () => {
  return (
    <View style={styles.container}>
      <Button text="Say hello" onPress={() => Alert.alert('Hello!')} />
        <Button text="Say goodbye" onPress={() => Alert.alert('Goodbye!')} buttonStyle={{backgroundColor: '#4dc2c2'}} />
    </View>
  )
}

export default Project3

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#ff637c',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    }
})