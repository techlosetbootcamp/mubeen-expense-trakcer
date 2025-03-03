import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../../config/firebaseConfig';
import { get, ref } from 'firebase/database';
import { signOut } from 'firebase/auth';

const useProfile = () => {
    const navigation: any = useNavigation();
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [isImageModalVisible, setImageModalVisible] = useState(false); // New state for image modal

    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = ref(database, `users/${user.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setUsername(userData.displayName || "User");
                    setProfilePicture(userData.profilePicture || "");
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
            setLogoutModalVisible(false);
            navigation.reset({
                index: 0,
                routes: [{ name: "AuthenticationScreen" }],
            });
            navigation.navigate("AuthenticationScreen");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // New functions for image modal
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
        isImageModalVisible, // Expose new state
        setImageModalVisible,
        useEffect,
        openLogoutModal,
        closeLogoutModal,
        handleLogout,
        openImageModal, // Expose new function
        closeImageModal, // Expose new function
    };
};

export default useProfile;