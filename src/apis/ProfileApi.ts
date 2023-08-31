
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

const getProfile = async (request: UserProfileRequest): Promise<UserProfileResponse> => {
  try {
    console.log('Sending GET request to retrieve user profile...');
    const response = await fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${request.token}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to retrieve user profile:', response.status);
      throw new Error('Failed to retrieve user profile');
    }

    const data = await response.json();
    console.log('User profile retrieved successfully:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    throw error;
  }
};

export default getProfile;