import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Square = ({ text, bgColor = '#7ce0f9' }: any) => (
  <View style={[styles.box, { backgroundColor: bgColor }]}>
    <Text>{text}</Text>
  </View>
);

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const Project6 = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        {data.map((item, index) => (
          <Square key={item} text={`Square ${index + 1}`} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Project6;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    }
  });