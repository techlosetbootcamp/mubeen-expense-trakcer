import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      Alert.alert(
        "Success",
        "A password reset link has been sent to your email address."
      );
      navigation.goBack(); // Navigate back to the LoginScreen
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "No user found with this email address.");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>

      {/* Instruction Text */}
      <Text style={styles.text}>
        Don’t worry. Enter your email and we’ll send you a link to reset your
        password.
      </Text>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError("");
        }}
        keyboardType="email-address"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Send Email Button */}
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={handlePasswordReset}
      >
        <Text style={styles.forgotButtonText}>Send Email</Text>
      </TouchableOpacity>

      {/* Bottom Black Line */}
      <View style={styles.bottomLine} />
    </View>
  );
};
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 70,
  },
  text: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "center",
    paddingHorizontal: 70,
    marginBottom: 1,
  },
  input: {
    height: 50,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  forgotButton: {
    height: 50,
    backgroundColor: "#7f3dff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  forgotButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    color: "#9e9e9e",
    marginVertical: 10,
  },
  bottomLine: {
    position: "absolute",
    bottom: 20,
    left: "40%",
    width: "20%",
    height: 2,
    backgroundColor: "#000",
  },
  errorText: {
    color: "red",
    marginVertical: 5,
    textAlign: "center",
  },
});
