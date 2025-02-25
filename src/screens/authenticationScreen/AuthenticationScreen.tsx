import React, { useState } from 'react';
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
    showPassword,
    setShowPassword
  } = useAuthenticationScreen();

  const [isChecked, setIsChecked] = useState(false);

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
      <View style={[styles.input, { position: 'relative' }]}>
        <TextInput
          style={{ width: '100%', height: '100%', paddingHorizontal: 0 }}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={{ position: 'absolute', right: 10, top: 12, zIndex: 1 }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {!isLogin && (
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
          onPress={() => setIsChecked(!isChecked)}
        >
          <Ionicons
            name={isChecked ? "checkbox" : "checkbox-outline"}
            size={30}
            color="black"
          />
          <Text style={[styles.Policy, { marginLeft: 8, marginRight: 8}]}>
            By signing up, you agree to the
            <Text style={{color:'#7f3dff'}}>
              Terms of Service and Privacy Policy
            </Text>
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
        <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPassword}>{isLogin ? "Forgot Password?" : ""}</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

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

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthenticationScreen;
