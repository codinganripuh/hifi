import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      const response = await axios.get('https://reqres.in/api/users');
      const users = response.data.data; // Extract user data

      // Check if entered username exists in the API response
      const userExists = users.some(user => user.email === username);

      if (userExists) {
        setLoading(false);
        Alert.alert('Login Successful', `Welcome, ${username}!`);
        onLogin(); // Trigger login callback
      } else {
        setLoading(false);
        Alert.alert('Login Failed', 'Invalid username or password.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Unable to login. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Music App</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#f49019" />
      ) : (
        <Button title="Login" onPress={handleLogin} color="#f49019" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
