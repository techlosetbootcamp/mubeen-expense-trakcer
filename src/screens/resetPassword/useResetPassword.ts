import { useState } from "react";
import { Alert } from "react-native";
import { auth } from "../../config/firebaseConfig";
import { updatePassword, sendEmailVerification } from "firebase/auth";

const useResetPassword = (navigation: any) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordUpdate = async () => {
    // Validation
    if (!newPassword || !confirmPassword || !retypePassword) {
      setError("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword || newPassword !== retypePassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("No user is currently signed in");
        return;
      }

      // Update the password
      await updatePassword(user, newPassword);

      // Send confirmation email (optional, see note below)
      await sendEmailVerification(user);
      
      Alert.alert(
        "Success",
        "Your password has been updated successfully. A confirmation email has been sent.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Main"), // Redirect to main screen
          },
        ]
      );
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        setError("Please re-login to update your password");
        Alert.alert(
          "Error",
          "This operation requires recent authentication. Please log out and log back in."
        );
      } else {
        setError(error.message);
        Alert.alert("Error", error.message);
      }
    }
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    retypePassword,
    setRetypePassword,
    error,
    handlePasswordUpdate,
  };
};

export default useResetPassword;