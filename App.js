import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SearchScreen from './src/screens/SearchScreen';
import NewReleasesScreen from './src/screens/NewReleasesScreen';
import LoginScreen from './src/screens/LoginScreen';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create UserContext to hold user data
const UserContext = React.createContext();

const AppTabs = () => {
  const { userEmail } = useContext(UserContext); // Access userEmail from context

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: 'rgba(0, 0, 0, 1)',
        },
        headerStyle: {
          backgroundColor: '#f49019',
          height: 120,
        },
        headerTitle: '',
        headerLeft: () => (
          <Image
            source={require('./assets/logo.png')}
            style={{
              width: 200,
              height: 60,
              resizeMode: 'contain',
              marginLeft: 10,
              marginTop: 10,
            }}
          />
        ),
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="New Releases"
        component={NewReleasesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums" color={color} size={size} />
          ),
        }}
      />
      {/* Access the userEmail from context and pass to ProfileScreen */}
      <Tab.Screen
        name="Profile"
        children={() => <ProfileScreen email={userEmail} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  return (
    <UserContext.Provider value={{ userEmail }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} onLogin={(email) => { setIsLoggedIn(true); setUserEmail(email); }} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Main" component={AppTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}