
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';
import { registerUser } from './apiUtils';

export const registerUserApi = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    console.log('Sending user registration request:', request);
    const response = await registerUser(request);
    console.log('Received user registration response:', response);
    return response;
  } catch (error) {
    console.error('Error occurred during user registration:', error);
    throw error;
  }
};