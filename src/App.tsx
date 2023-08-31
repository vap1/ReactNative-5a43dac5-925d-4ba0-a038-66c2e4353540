
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContextProvider } from './contexts/AuthContext';
import { ProfileContextProvider } from './contexts/ProfileContext';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminUserDetailsScreen from './screens/AdminUserDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    console.log('App component mounted');
    // Additional initialization logic can be added here
    return () => {
      console.log('App component unmounted');
      // Additional cleanup logic can be added here
    };
  }, []);

  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Admin User Details" component={AdminUserDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
};

export default App;