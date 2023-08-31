
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { ProfileContext } from '../contexts/ProfileContext';
import { updateProfile } from '../apis/ProfileUpdateApi';
import { UserProfileUpdateRequest } from '../types/Types';

const ProfileForm: React.FC = () => {
  const { userProfile, setUserProfile } = useContext(ProfileContext);
  const [name, setName] = useState(userProfile.name);
  const [contactInfo, setContactInfo] = useState(userProfile.contactInfo);
  const [address, setAddress] = useState(userProfile.address);

  const handleSaveProfile = async () => {
    try {
      const request: UserProfileUpdateRequest = {
        token: userProfile.token,
        name,
        contactInfo,
        address,
      };

      const response = await updateProfile(request);
      if (response.success) {
        setUserProfile({
          ...userProfile,
          name,
          contactInfo,
          address,
        });
        Alert.alert('Success', response.message);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        value={contactInfo}
        onChangeText={setContactInfo}
        placeholder="Contact Info"
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />
      <Button title="Save" onPress={handleSaveProfile} />
    </View>
  );
};

export default ProfileForm;