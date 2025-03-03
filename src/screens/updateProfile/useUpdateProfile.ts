import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { get, ref, set } from 'firebase/database';
import { auth, database } from '../../config/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../store/slices/userSlice';

const useUpdateProfile = () => {
    const navigation: any = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const { username: initialUsername, profilePicture: initialProfilePicture } = route.params as {
        username: string;
        profilePicture: string;
    };

    const user = auth.currentUser;

    const [username, setUsername] = useState(initialUsername);
    const [email, setEmail] = useState(user?.email || '');
    const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
    const [originalUsername, setOriginalUsername] = useState(initialUsername);
    const [originalEmail, setOriginalEmail] = useState(user?.email || '');
    const [originalProfilePicture, setOriginalProfilePicture] = useState(initialProfilePicture);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (user) {
            const userRef = ref(database, `users/${user.uid}`);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setUsername(userData.displayName || '');
                    setOriginalUsername(userData.displayName || '');
                    setProfilePicture(userData.profilePicture || '');
                    setOriginalProfilePicture(userData.profilePicture || '');
                    dispatch(setUserProfile({
                        profilePicture: userData.profilePicture || '',
                        name: userData.displayName || ''
                    }));
                }
            });
        }
    }, [user, dispatch]);

    const handleImagePick = async (fromCamera: boolean) => {
        let result: any = null;

        try {
            if (fromCamera) {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Camera permission is required.');
                    return;
                }
                result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                    base64: true,
                });
            } else {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Gallery access is required.');
                    return;
                }
                result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                    base64: true,
                });
            }

            if (!result.canceled) {
                const base64Image = result.assets[0].base64;
                setProfilePicture(base64Image);
                if (user) {
                    await set(ref(database, `users/${user.uid}/profilePicture`), base64Image);
                    dispatch(setUserProfile({
                        profilePicture: base64Image,
                        name: username
                    }));
                }
            }
        } catch (error) {
            console.error('Error selecting image:', error);
            Alert.alert('Error', 'Failed to pick an image.');
        }
    };

    const handleEmailUpdate = async () => {
        if (!user) return;
        try {
            if (email !== originalEmail) {
                Alert.prompt(
                    'Re-authenticate',
                    'Enter your current password to update the email.',
                    async (password) => {
                        if (!password) {
                            Alert.alert('Error', 'Password is required for email update.');
                            return;
                        }

                        try {
                            const credential = EmailAuthProvider.credential(user.email!, password);
                            await reauthenticateWithCredential(user, credential);
                            await updateEmail(user, email);
                            await set(ref(database, `users/${user.uid}/email`), email);
                            Alert.alert('Success', 'Email updated successfully!');
                        } catch (error) {
                            Alert.alert('Error', 'Re-authentication failed. Please check your password.');
                        }
                    }
                );
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update email. Please try again.');
        }
    };

    const handleUpdateProfile = async () => {
        if (!user) return;
        try {
            await handleEmailUpdate();

            const userRef = ref(database, `users/${user.uid}`);

            if (username !== originalUsername) {
                await set(ref(database, `users/${user.uid}/displayName`), username);
            }

            if (profilePicture !== originalProfilePicture) {
                await set(ref(database, `users/${user.uid}/profilePicture`), profilePicture);
            }

            dispatch(setUserProfile({
                profilePicture: profilePicture || '',
                name: username
            }));

            Alert.alert('Success', 'Profile updated successfully!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile.');
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
        username,
        profilePicture,
        handleUpdateProfile,
        setUsername,
        email,
        setEmail,
        setProfilePicture,
        isUpdating,
        handleImagePick,
        handleEmailUpdate,
    };
};

export default useUpdateProfile;