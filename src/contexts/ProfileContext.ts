
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileRequest, UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { getProfile, updateProfile } from '../apis/ProfileApi';

interface ProfileContextProps {
  userProfile: UserProfileResponse | null;
  loading: boolean;
  error: string | null;
  getUserProfile: () => void;
  updateUserProfile: (request: UserProfileUpdateRequest) => void;
}

export const ProfileContext = createContext<ProfileContextProps>({
  userProfile: null,
  loading: false,
  error: null,
  getUserProfile: () => {},
  updateUserProfile: () => {},
});

export const ProfileProvider: React.FC = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    setLoading(true);
    setError(null);

    const request: UserProfileRequest = {
      token: 'USER_JWT_TOKEN', // Replace with actual user token
    };

    getProfile(request)
      .then((response: UserProfileResponse) => {
        setUserProfile(response);
        setLoading(false);
      })
      .catch((error: string) => {
        setError(error);
        setLoading(false);
      });
  };

  const updateUserProfile = (request: UserProfileUpdateRequest) => {
    setLoading(true);
    setError(null);

    request.token = 'USER_JWT_TOKEN'; // Replace with actual user token

    updateProfile(request)
      .then((response: UserProfileUpdateResponse) => {
        // Log success message
        console.log('Profile updated successfully');
        getUserProfile(); // Refresh user profile after update
      })
      .catch((error: string) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        loading,
        error,
        getUserProfile,
        updateUserProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};