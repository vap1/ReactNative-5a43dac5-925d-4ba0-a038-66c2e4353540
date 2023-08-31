
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getUserList } from '../apis/AdminApi';
import { User } from '../types/Types';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await getUserList();
      if (response.success) {
        setUsers(response.users);
      } else {
        console.log('Failed to fetch user list:', response.message);
      }
    } catch (error) {
      console.log('Error fetching user list:', error);
    }
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <View>
      <Text>Name: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Contact Info: {item.contactInfo}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Profile Picture: {item.profilePicture}</Text>
    </View>
  );

  return (
    <View>
      <Text>User List</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.email}
      />
    </View>
  );
};

export default UserList;