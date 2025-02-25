import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { setUser } from "../../store/slices/userSlice";
import { auth, database } from "../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { useAppDispatch } from "../../store/store";
import { useNavigation } from "@react-navigation/native";

const useAuthenticationScreen = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthentication = async () => {
    if (!email || !password || (!isLogin && !username)) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsAuthenticating(true);

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.exists()
          ? snapshot.val()
          : { displayName: "" };

        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: userData.displayName || "",
            photoURL: user.photoURL || "",
            income: [],
          })
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName: username });
        await set(ref(database, `users/${user.uid}`), {
          displayName: username,
          email: user.email,
          income: 0,
        });
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: username,
            photoURL: "",
            income: [],
          })
        );
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
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
