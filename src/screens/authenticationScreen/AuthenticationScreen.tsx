import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import styles from "./AuthenticationScreen.style";
import useAuthenticationScreen from "./useAuthenticationScreen";
import Loader from '../../components/loader/Loader';

const AuthenticationScreen: React.FC = () => {
 
  const {
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
  } = useAuthenticationScreen()

  if (isAuthenticating) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 100 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </View>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
        <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPassword}>
          {isLogin ? "Forgot Password?" : ""}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>
      {/* Google Authentication Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={{
            uri: "https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business-thumbnail.png",
          }}
          style={{ width: 30, height: 30 }}
        />
        <View>
          <Text style={styles.googleButtonText}>
            {isLogin ? "Sign in with Google" : "SignUp with Google"}
          </Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};

export default AuthenticationScreen;
