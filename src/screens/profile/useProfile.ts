import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../../config/firebaseConfig';
import { get, ref } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { useAppDispatch } from '../../store/store';
import { clearUser } from '../../store/slices/userSlice';
import { setIncome } from '../../store/slices/incomeSlice'; // Added import
import { setExpenses } from '../../store/slices/expenseSlice'; // Added import

const useProfile = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth?.currentUser;
      if (user) {
        const userRef = ref(database, `users/${user?.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot?.val();
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
      dispatch(clearUser()); // Clear user data
      dispatch(setIncome([])); // Clear income data
      dispatch(setExpenses([])); // Clear expense data
      setLogoutModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Authentication' }],
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
    useEffect, // Note: Returning useEffect isn't typical; consider removing unless used elsewhere
    openLogoutModal,
    closeLogoutModal,
    handleLogout,
    openImageModal,
    closeImageModal,
  };
};

export default useProfile;