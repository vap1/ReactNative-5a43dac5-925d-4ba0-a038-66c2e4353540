
import React, { createContext, useState } from 'react';
import { UserLoginRequest, UserLoginResponse, UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';
import { loginUser, registerUser } from '../apis/AuthApi';

interface AuthContextProps {
  user: UserLoginResponse | null;
  register: (request: UserRegistrationRequest) => Promise<UserRegistrationResponse>;
  login: (request: UserLoginRequest) => Promise<UserLoginResponse>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  register: () => Promise.resolve({ success: false, message: '' }),
  login: () => Promise.resolve({ success: false, message: '', token: '' }),
  logout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserLoginResponse | null>(null);

  const register = async (request: UserRegistrationRequest) => {
    try {
      // Perform API call for user registration
      const response = await registerUser(request);

      // Log the response
      console.log('User Registration Response:', response);

      return response;
    } catch (error) {
      // Log the error
      console.error('User Registration Error:', error);

      return { success: false, message: 'An error occurred during registration' };
    }
  };

  const login = async (request: UserLoginRequest) => {
    try {
      // Perform API call for user login
      const response = await loginUser(request);

      // Log the response
      console.log('User Login Response:', response);

      if (response.success) {
        setUser(response);
      }

      return response;
    } catch (error) {
      // Log the error
      console.error('User Login Error:', error);

      return { success: false, message: 'An error occurred during login', token: '' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};