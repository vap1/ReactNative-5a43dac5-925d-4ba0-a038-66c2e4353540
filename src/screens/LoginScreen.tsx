
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { login } from '../apis/AuthApi';
import { UserLoginRequest } from '../types/Types';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      const request: UserLoginRequest = {
        email,
        password,
      };

      console.log('Sending login request:', request);

      const response = await login(request);

      console.log('Received login response:', response);

      if (response.success) {
        // Handle successful login
        console.log('User logged in successfully');
      } else {
        // Handle login error
        setError(response.message);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setError('An error occurred during login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>Login</Text>
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
      {error ? <Text>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} disabled={loading} />
    </View>
  );
};

export default LoginScreen;