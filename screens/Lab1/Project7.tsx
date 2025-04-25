import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';

const Project7 = () => {
  const [name, setName] = useState("");
  const handleAlert = () => {
    Alert.alert("Hello", `Hello ${name}!`);
    setName("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What is your name?</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TouchableOpacity style={styles.button} onPress={handleAlert}>
        <Text style={styles.buttonText}>Say Hello</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Project7;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
  }
});