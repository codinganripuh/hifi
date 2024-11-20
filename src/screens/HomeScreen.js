import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/true.jpg')} // Path to your background image
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* App Logo */}
        

        {/* Welcome Message */}
        <Text style={styles.title}>Welcome to Music Explorer!</Text>

        {/* Description of the app */}
        <Text style={styles.description}>
          Discover albums, explore artists, and listen to your favorite tracks all in one place.
        </Text>

        {/* Call-to-Action Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.buttonText}>Start Exploring</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.profileButton]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>Go to Profile</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire screen
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional: Adds a dark overlay for better text contrast
    width: '100%',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    width: '80%',
  },
  profileButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
