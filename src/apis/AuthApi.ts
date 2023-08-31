
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

const login = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    console.log('Sending login request:', request);

    // Make API call to the login endpoint
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    console.log('Received login response:', response);

    // Parse the response JSON
    const data = await response.json();

    console.log('Parsed login response:', data);

    // Return the response data
    return data;
  } catch (error) {
    console.error('Error occurred during login:', error);
    throw error;
  }
};

export default {
  login,
};