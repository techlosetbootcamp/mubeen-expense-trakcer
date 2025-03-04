import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../../config/firebaseConfig';
import { get, ref } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { useAppDispatch } from '../../store/store'; // Import useAppDispatch
import { clearUser } from '../../store/slices/userSlice'; // Import clearUser

const useProfile = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch(); // Add dispatch
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUsername(userData.displayName || 'User');
          setProfilePicture(userData.profilePicture || '');
        }
      }
    };

    fetchUserProfile();
  }, []);


  const openLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser()); // Clear Redux user state
      setLogoutModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Authentication' }], // Use "Authentication" as defined in ScreenNames
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const openImageModal = () => {
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
  };

  return {
    navigation,
    username,
    setUsername,
    profilePicture,
    setProfilePicture,
    isLogoutModalVisible,
    setLogoutModalVisible,
    isImageModalVisible,
    setImageModalVisible,
    useEffect,
    openLogoutModal,
    closeLogoutModal,
    handleLogout,
    openImageModal,
    closeImageModal,
  };
};

export default useProfile;