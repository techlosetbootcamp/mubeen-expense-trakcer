// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth } from "../config/firebaseConfig";
// import { useNavigation } from "@react-navigation/native";

// interface SignInScreenProps {
//   navigateToScreen?: (screen: string) => void;
// }

// const SignInScreen: React.FC<SignInScreenProps> = ({
//   navigateToScreen = () => {},
// }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const navigation: any = useNavigation();

//   const handleSignIn = async () => {
//     let valid = true;

//     if (!email) {
//       setEmailError("This field is required!");
//       valid = false;
//     } else {
//       setEmailError("");
//     }

//     if (!password) {
//       setPasswordError("This field is required!");
//       valid = false;
//     } else {
//       setPasswordError("");
//     }

//     if (!valid) return;

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigateToScreen("Home");
//     } catch (error: any) {
//       if (
//         error.code === "auth/wrong-password" ||
//         error.code === "auth/user-not-found"
//       ) {
//         Alert.alert("Error", "Wrong Email or Password");
//       } else {
//         Alert.alert("Error", error.message);
//       }
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(auth, provider);
//       navigateToScreen("Home");
//     } catch (error: any) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigateToScreen("SignUp")}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Sign In</Text>
//       </View>

//       {/* Input Fields */}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={(text) => {
//           setEmail(text);
//           setEmailError("");
//         }}
//         keyboardType="email-address"
//       />
//       {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={(text) => {
//             setPassword(text);
//             setPasswordError("");
//           }}
//           secureTextEntry={!showPassword}
//         />
//         <TouchableOpacity
//           style={styles.eyeIcon}
//           onPress={() => setShowPassword(!showPassword)}
//         >
//           <Ionicons
//             name={showPassword ? "eye-off" : "eye"}
//             size={20}
//             color={"#91919f"}
//             style={{ paddingTop: 10 }}
//           />
//         </TouchableOpacity>
//       </View>
//       {passwordError ? (
//         <Text style={styles.errorText}>{passwordError}</Text>
//       ) : null}

//       {/* Sign In Button */}
//       <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
//         <Text style={styles.signInButtonText}>Sign In</Text>
//       </TouchableOpacity>

//       {/* Forgot Password Link */}
//       <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
//         <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//       </TouchableOpacity>

//       {/* OR Divider */}
//       <Text style={styles.orText}>or</Text>

//       {/* Google Sign In */}
//       <TouchableOpacity
//         style={styles.googleButton}
//         onPress={handleGoogleSignIn}
//       >
//         <Image
//           source={{
//             uri: "https://www.cdnlogo.com/logos/g/35/google-icon.svg",
//           }}
//           style={styles.googleIcon}
//         />
//         <Text style={styles.googleButtonText}>Login with Google</Text>
//       </TouchableOpacity>

//       {/* Footer */}
//       <Text style={styles.footerText}>
//         Don’t have an account yet?{" "}
//         <Text
//           style={styles.linkText}
//           // onPress={() => navigateToScreen("SignUp")}
//           onPress={() => navigation.navigate("SignUp")}
//         >
//           Sign Up
//         </Text>
//       </Text>
//     </View>
//   );
// };

// export default SignInScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: "#fff",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 40,
//     marginBottom: 70,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginLeft: 10,
//     textAlign: "center",
//     paddingHorizontal: 70,
//     marginBottom: 1,
//   },
//   input: {
//     height: 50,
//     borderColor: "#e5e5e5",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginVertical: 10,
//   },
//   passwordContainer: {
//     position: "relative",
//     width: "100%",
//   },
//   errorText: {
//     width: "90%",
//     color: "red",
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   eyeIcon: {
//     position: "absolute",
//     right: 15,
//     top: 15,
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: "#e5e5e5",
//     marginRight: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   termsText: {
//     fontSize: 14,
//     color: "#9e9e9e",
//     flex: 1,
//   },
//   linkText: {
//     color: "#7f3dff",
//     textDecorationLine: "underline",
//   },
//   signInButton: {
//     height: 50,
//     backgroundColor: "#7f3dff",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   signInButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   orText: {
//     textAlign: "center",
//     color: "#9e9e9e",
//     marginVertical: 10,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     height: 50,
//     borderColor: "#e5e5e5",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#616161",
//   },
//   footerText: {
//     textAlign: "center",
//     marginVertical: 20,
//     color: "#9e9e9e",
//   },
//   forgotPasswordContainer: {
//     alignItems: "flex-end",
//     marginTop: 0,
//     marginBottom: 20,
//   },
//   forgotPasswordText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#7f3dff",
//   },
// });
