
import { AdminUserDetailsRequest, AdminUserDetailsResponse } from '../types/Types';
import { BASE_URL } from '../config';
import axios from 'axios';

export const getAdminUserDetails = async (request: AdminUserDetailsRequest): Promise<AdminUserDetailsResponse> => {
  try {
    console.log('Sending request to get admin user details...');
    const response = await axios.get(`${BASE_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    });
    console.log('Received response for admin user details:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error while getting admin user details:', error);
    throw error;
  }
};