import { View, Text, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { get, ref, set } from 'firebase/database';
import { auth, database } from '../../config/firebaseConfig';
import * as ImagePicker from "expo-image-picker";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';


const useUpdateProfile = () => {

    const navigation: any = useNavigation();
    const route = useRoute();
    const { username: initialUsername, profilePicture: initialProfilePicture } = route.params as {
        username: string;
        profilePicture: string;
    };


    const handleUpdateProfile = async () => {
        if (!user) return;
        try {
            // 🔹 Ensure email update first
            await handleEmailUpdate();

            const userRef = ref(database, `users/${user.uid}`);

            // 🔹 Update username if changed
            if (username !== originalUsername) {
                await set(ref(database, `users/${user.uid}/displayName`), username);
            }

            // 🔹 Update profile picture if changed
            if (profilePicture !== originalProfilePicture) {
                await set(ref(database, `users/${user.uid}/profilePicture`), profilePicture);
            }

            Alert.alert("Success", "Profile updated successfully!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Failed to update profile.");
        }
    };


    const user = auth.currentUser;

    // State hooks
    const [username, setUsername] = useState(initialUsername);
    const [email, setEmail] = useState(user?.email || "");
    const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
    const [originalUsername, setOriginalUsername] = useState(initialUsername);
    const [originalEmail, setOriginalEmail] = useState(user?.email || "");
    const [originalProfilePicture, setOriginalProfilePicture] = useState(initialProfilePicture);
    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch user data on mount
    useEffect(() => {
        if (user) {
            const userRef = ref(database, `users/${user.uid}`);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setUsername(userData.displayName || "");
                    setOriginalUsername(userData.displayName || "");
                    setProfilePicture(userData.profilePicture || "");
                    setOriginalProfilePicture(userData.profilePicture || "");
                }
            });
        }
    }, [user]);

    // Handle Image Upload
    const handleImagePick = async (fromCamera: boolean) => {
        let result;
        if (fromCamera) {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        }
        if (!result.canceled) {
            setProfilePicture(result.assets[0].uri);
        }
    };

    // Handle Email Update (Requires Re-authentication)
    const handleEmailUpdate = async () => {
        if (!user) return;
        try {
            if (email !== originalEmail) {
                // Ask the user for their current password
                Alert.prompt(
                    "Re-authenticate",
                    "Enter your current password to update the email.",
                    async (password) => {
                        if (!password) {
                            Alert.alert("Error", "Password is required for email update.");
                            return;
                        }

                        try {
                            // Re-authenticate user with the entered password
                            const credential = EmailAuthProvider.credential(user.email!, password);
                            await reauthenticateWithCredential(user, credential);

                            // Update email
                            await updateEmail(user, email);
                            Alert.alert("Success", "Email updated successfully!");
                        } catch (error) {
                            Alert.alert("Error", "Re-authentication failed. Please check your password.");
                        }
                    }
                );
            }
        } catch (error) {
            Alert.alert("Error", "Failed to update email. Please try again.");
        }
    };

    useEffect(() => {
        setIsUpdating(
            username !== originalUsername ||
            email !== originalEmail ||
            profilePicture !== originalProfilePicture
        );
    }, [username, email, profilePicture]);

    return {
        navigation,
        route,
        username,
        profilePicture,
        handleUpdateProfile,
        user,
        setUsername,
        email,
        setEmail,
        setProfilePicture,
        originalUsername,
        setOriginalUsername,
        originalEmail,
        setOriginalEmail,
        originalProfilePicture,
        setOriginalProfilePicture,
        isUpdating,
        setIsUpdating,
        useEffect,
        handleImagePick,
        handleEmailUpdate,
    }
}

export default useUpdateProfile