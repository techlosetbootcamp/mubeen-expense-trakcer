import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./resetPassword.style";
import useResetPassword from "./useResetPassword";

const ResetPassword = ({ navigation }: any) => {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    retypePassword,
    setRetypePassword,
    error,
    handlePasswordUpdate,
  } = useResetPassword(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Reset Password</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Retype New Password"
          value={retypePassword}
          onChangeText={(text) => setRetypePassword(text)}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handlePasswordUpdate}>
        <Text style={styles.resetButtonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;