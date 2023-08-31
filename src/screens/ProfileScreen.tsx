
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { ProfileContext } from '../contexts/ProfileContext';
import { ProfileApi } from '../apis/ProfileApi';
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

const ProfileScreen = () => {
  const { userProfile, updateUserProfile } = useContext(ProfileContext);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    // Fetch user profile information on component mount
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const request: UserProfileRequest = {
        token: 'USER_JWT_TOKEN', // Replace with actual user JWT token
      };

      const response: UserProfileResponse = await ProfileApi.getUserProfile(request);
      if (response) {
        setName(response.user.name);
        setContactInfo(response.user.contactInfo);
        setAddress(response.user.address);
        setProfilePicture(response.user.profilePicture);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const request: UserProfileUpdateRequest = {
        token: 'USER_JWT_TOKEN', // Replace with actual user JWT token
        name,
        contactInfo,
        address,
        profilePicture,
      };

      const response: UserProfileUpdateResponse = await ProfileApi.updateUserProfile(request);
      if (response.success) {
        console.log('Profile updated successfully');
      } else {
        console.error('Error updating profile:', response.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={contactInfo}
        onChangeText={setContactInfo}
        placeholder="Contact Info"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />
      <Image
        style={styles.profilePicture}
        source={{ uri: profilePicture }}
      />
      <Button
        title="Save"
        onPress={handleSaveProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
  },
  profilePicture: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
});

export default ProfileScreen;