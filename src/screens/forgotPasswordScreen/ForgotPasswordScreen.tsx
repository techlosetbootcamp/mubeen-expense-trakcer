import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ForgotPasswordScreen.style";
import useForgotPassword from "./useForgotPassword";



const ForgotPasswordScreen = ({ navigation }: any) => {
  
  const { email, setEmail, error, handlePasswordReset } =
    useForgotPassword(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>

      <Text style={styles.text}>
        Don’t worry. Enter your email and we’ll send you a link to reset your
        password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={handlePasswordReset}
      >
        <Text style={styles.forgotButtonText}>Send Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
