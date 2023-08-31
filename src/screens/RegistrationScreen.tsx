
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { UserRegistrationRequest } from '../types/Types';
import { registerUser } from '../apis/UserApi';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const request: UserRegistrationRequest = {
      name,
      email,
      password,
    };

    try {
      // Log: Sending registration request
      console.log('Sending registration request:', request);

      const response = await registerUser(request);

      // Log: Registration response received
      console.log('Registration response received:', response);

      if (response.success) {
        // Log: Registration successful
        console.log('Registration successful');
        // TODO: Handle successful registration, e.g., navigate to login screen
      } else {
        // Log: Registration failed
        console.log('Registration failed:', response.message);
        setErrorMessage(response.message);
      }
    } catch (error) {
      // Log: Registration error
      console.log('Registration error:', error);
      setErrorMessage('An error occurred during registration.');
    }

    setIsLoading(false);
  };

  return (
    <View>
      <Text>Registration Screen</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Button
        title={isLoading ? 'Loading...' : 'Register'}
        onPress={handleRegistration}
        disabled={isLoading}
      />
    </View>
  );
};

export default RegistrationScreen;