
import { UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';

const updateProfile = async (request: UserProfileUpdateRequest): Promise<UserProfileUpdateResponse> => {
  try {
    console.log('Updating user profile...');
    console.log('Request:', request);

    // Make the API call to update the user profile
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${request.token}`,
      },
      body: JSON.stringify({
        name: request.name,
        contactInfo: request.contactInfo,
        address: request.address,
        profilePicture: request.profilePicture,
      }),
    });

    console.log('Response:', response);

    if (!response.ok) {
      console.error('Failed to update user profile');
      throw new Error('Failed to update user profile');
    }

    const data: UserProfileUpdateResponse = await response.json();

    console.log('Profile updated successfully');
    console.log('Response:', data);

    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export default updateProfile;