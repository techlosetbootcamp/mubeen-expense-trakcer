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
            await signOut(auth); // Sign out from Firebase
            setLogoutModalVisible(false); // Close the modal
            navigation.reset({
                index: 0,
                routes: [{ name: "AuthenticationScreen" }], // Reset navigation stack
            });
            navigation.navigate("AuthenticationScreen")
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return {
        navigation,
        username,
        setUsername,
        profilePicture,
        setProfilePicture,
        isLogoutModalVisible,
        setLogoutModalVisible,
        useEffect,
        openLogoutModal,
        closeLogoutModal,
        handleLogout
    }
}

export default useProfile

