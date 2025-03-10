import { Alert } from 'react-native'
import { useState } from 'react'
import { setUser } from "../../store/slices/userSlice";
import { auth, database } from "../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { useAppDispatch } from "../../store/store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationParamList } from '../../constants/types/navigationTypes';

const useAuthenticationScreen = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<StackNavigationParamList>>();
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthentication = async () => {
    if (!email || !password || (!isLogin && !username)) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsAuthenticating(true);

    try {
      let userCredential: UserCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential?.user;
        const userRef = ref(database, `users/${user?.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot?.exists()
          ? snapshot.val()
          : { displayName: "" };
  
        dispatch(
          setUser({
            uid: user?.uid ?? "",
            email: user?.email ?? "",
            displayName: userData?.displayName || "",
            photoURL: user?.photoURL || "",
            income: [],
          })
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: username });
        await set(ref(database, `users/${user?.uid}`), {
          displayName: username,
          email: user?.email,
          income: 0,
        });
        dispatch(
          setUser({
            uid: user?.uid ?? "",
            email: user?.email ?? "",
            displayName: username,
            photoURL: "",
            income: [],
          })
        );
      }
      navigation.navigate("Main");
    } catch (error: unknown) { // Use unknown
      // Assert or type-guard the error as having Firebase error properties
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return {
    isLogin,
    setIsLogin,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    dispatch,
    navigation,
    handleAuthentication,
    isAuthenticating,
    showPassword,
    setShowPassword
  }
}

export default useAuthenticationScreen;
