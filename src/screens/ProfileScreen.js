import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function ProfileScreen() {
  return (
    <ImageBackground
      source={require('../../assets/true.jpg')} // Replace with the path to your image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Music Discovery App</Text>
        <Text style={styles.text}>Version 1.0</Text>
        <Text style={styles.text}>Developed by Rudatmaulana</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay to make text readable
    paddingHorizontal: 110, // Optional: add padding if needed
    borderRadius: 10, // Optional: round the corners
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    color: '#fff', // White color for text to contrast against the background
  },
});