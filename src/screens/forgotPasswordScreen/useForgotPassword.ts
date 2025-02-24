import { useState } from "react";
import { Alert } from "react-native";
import { auth } from "../../config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const useForgotPassword = (navigation: any) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Success",
        "A password reset link has been sent to your email. Please check your inbox."
      );
      navigation.goBack();
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "No user found with this email address.");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return {
    email,
    setEmail,
    error,
    setError,
    handlePasswordReset,
  };
};

export default useForgotPassword;
