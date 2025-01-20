import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

const AuthenticationScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "1061115146692-4a1jskt6j0llmf09rdlal1s4rq7q1gns.apps.googleusercontent.com",
    });
  }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();

    // Try the new style of google-sign in result, from v13+ of that module
    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      // if you are using older versions of google-signin, try old style result
      idToken = signInResult?.idToken;
      console.log("idToken is ====>>", idToken);
    }
    if (!idToken) {
      throw new Error("No ID token found");
    }

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      signInResult?.data?.token
    );
    console.log("Googel credentials are ====>>", googleCredential);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View>
      <Text>AuthenticationScreen</Text>
      <Button title="Continue with Google" onPress={onGoogleButtonPress} />
    </View>
  );
};

export default AuthenticationScreen;

const styles = StyleSheet.create({});

// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import auth from "@react-native-firebase/auth";

// GoogleSignin.configure({
//   webClientId:
//     "1061115146692-4a1jskt6j0llmf09rdlal1s4rq7q1gns.apps.googleusercontent.com",
// });

// const AuthenticationScreen: React.FC = () => {
//   // Sign up with Google
//   const onGoogleSignUp = async () => {
//     try {
//       // Check if device supports Google Play
//       await GoogleSignin.hasPlayServices({
//         showPlayServicesUpdateDialog: true,
//       });

//       // Get the user's ID token
//       const { idToken } = await GoogleSignin.signIn();
//       if (!idToken) {
//         throw new Error("No ID token found during sign-up.");
//       }

//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Sign in or register the user with the credential
//       const userCredential = await auth().signInWithCredential(
//         googleCredential
//       );
//       console.log("Signed up successfully with Google:", userCredential.user);
//     } catch (error) {
//       console.error("Error signing up with Google:", error);
//     }
//   };

//   // Sign in with Google
//   const onGoogleSignIn = async () => {
//     try {
//       // Check if device supports Google Play
//       await GoogleSignin.hasPlayServices({
//         showPlayServicesUpdateDialog: true,
//       });

//       // Get the user's ID token
//       const { idToken } = await GoogleSignin.signIn();
//       if (!idToken) {
//         throw new Error("No ID token found during sign-in.");
//       }

//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Sign in the user
//       const userCredential = await auth().signInWithCredential(
//         googleCredential
//       );
//       console.log("Signed in successfully with Google:", userCredential.user);
//     } catch (error) {
//       console.error("Error signing in with Google:", error);
//     }
//   };

//   // Logout the user
//   const onLogout = async () => {
//     try {
//       await auth().signOut();
//       await GoogleSignin.signOut(); // Sign out from Google services
//       console.log("Logged out successfully");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={onGoogleSignUp}>
//         <Text style={styles.text}>Sign Up with Google</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={onGoogleSignIn}>
//         <Text style={styles.text}>Sign In with Google</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={onLogout}>
//         <Text style={styles.text}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default AuthenticationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   button: {
//     margin: 10,
//     padding: 15,
//     backgroundColor: "#4CAF50",
//     borderRadius: 5,
//     width: "80%",
//     alignItems: "center",
//   },
//   text: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React from "react";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import auth from "@react-native-firebase/auth";

// const AuthenticationScreen = () => {
//   GoogleSignin.configure({
//     webClientId: "",
//   });

//   async function onGoogleButtonPress() {
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     // Get the users ID token
//     const signInResult = await GoogleSignin.signIn();

//     // Try the new style of google-sign in result, from v13+ of that module
//     let idToken = signInResult.data?.idToken;
//     if (!idToken) {
//       // if you are using older versions of google-signin, try old style result
//       idToken = signInResult?.idToken;
//     }
//     if (!idToken) {
//       throw new Error("No ID token found");
//     }

//     // Create a Google credential with the token
//     const googleCredential = auth?.GoogleAuthProvider.credential(
//       signInResult?.data?.token
//     );

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(googleCredential);
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() =>
//           onGoogleButtonPress().then(() =>
//             console.log("Signed in with Google!")
//           )
//         }
//       >
//         Sign Up With Google
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         Sign In With Google
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>Logout</TouchableOpacity>
//     </View>
//   );
// };

// export default AuthenticationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   button: {
//     margin: 10,
//     padding: 10,
//     backgroundColor: "#4CAF50",
//     borderRadius: 5,
//     width: "80%",
//     color: "white",
//   },
//   text: {
//     color: "white",
//     fontSize: 18,
//     textAlign: "center",
//   },
// });

// import React, { useEffect, useState } from "react";
// import { Button, StyleSheet, Text, View, Alert } from "react-native";
// import * as Google from "expo-google-auth-session";
// import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

// // Type definitions
// type UserInfo = FirebaseAuthTypes.User | null;

// export const AuthenticationScreen = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [userInfo, setUserInfo] = useState<UserInfo>(null);

//   // Define the OAuth request
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     clientId: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual client ID
//   });

//   // Function to handle sign-up with email
//   const signUpWithEmail = async (email: string, password: string) => {
//     try {
//       const userCredential: FirebaseAuthTypes.UserCredential =
//         await auth().createUserWithEmailAndPassword(email, password);
//       Alert.alert("Success", "User registered successfully!");
//       setUserInfo(userCredential.user);
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   // Function to handle sign-in with email
//   const signInWithEmail = async (email: string, password: string) => {
//     try {
//       const userCredential: FirebaseAuthTypes.UserCredential =
//         await auth().signInWithEmailAndPassword(email, password);
//       Alert.alert("Success", "User signed in successfully!");
//       setUserInfo(userCredential.user);
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   // Function to handle Google Sign-In
//   const googleSignIn = async () => {
//     try {
//       const result = await promptAsync();
//       if (result.type === "success") {
//         const { id_token } = result.params;
//         const googleCredential = auth.GoogleAuthProvider.credential(id_token);
//         const userCredential = await auth().signInWithCredential(googleCredential);
//         setUserInfo(userCredential.user);
//         setError(null);
//         Alert.alert("Success", "User signed in with Google!");
//       } else {
//         throw new Error("Google Sign-In failed");
//       }
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   // Function to handle logout
//   const logout = async () => {
//     try {
//       await auth().signOut();
//       setUserInfo(null);
//       Alert.alert("Success", "User logged out!");
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     // Handle any necessary initialization or side effects here
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>{error && `Error: ${error}`}</Text>
//       {userInfo && (
//         <Text>Welcome, {userInfo.displayName || userInfo.email}!</Text>
//       )}
//       {userInfo ? (
//         <Button title="Logout" onPress={logout} />
//       ) : (
//         <View>
//           <Button title="Sign In with Google" onPress={googleSignIn} />
//           {/* Add Sign In and Sign Up buttons */}
//           <Button
//             title="Sign Up (Email)"
//             onPress={() => signUpWithEmail("test@example.com", "password123")}
//           />
//           <Button
//             title="Sign In (Email)"
//             onPress={() => signInWithEmail("test@example.com", "password123")}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
// });

// import { useEffect, useState } from "react";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
// } from "@react-native-google-signin/google-signin";
// import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
// import { Button, StyleSheet, Text, View, Alert } from "react-native";

// // Type definitions
// type UserInfo = FirebaseAuthTypes.User | null;

// export const AuthenticationScreen = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [userInfo, setUserInfo] = useState<UserInfo>(null);

//   // Function to handle sign-up with email
//   const signUpWithEmail = async (email: string, password: string) => {
//     try {
//       const userCredential: FirebaseAuthTypes.UserCredential =
//         await auth().createUserWithEmailAndPassword(email, password);
//       Alert.alert("Success", "User registered successfully!");
//       setUserInfo(userCredential.user);
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   // Function to handle sign-in with email
//   const signInWithEmail = async (email: string, password: string) => {
//     try {
//       const userCredential: FirebaseAuthTypes.UserCredential =
//         await auth().signInWithEmailAndPassword(email, password);
//       Alert.alert("Success", "User signed in successfully!");
//       setUserInfo(userCredential.user);
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   // Function to handle Google Sign-In
//   const googleSignIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const response: any = await GoogleSignin.signIn(); // Use `any` to bypass the type error
//       const idToken = response.idToken;
//       if (idToken) {
//         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//         const userCredential = await auth().signInWithCredential(
//           googleCredential
//         );
//         setUserInfo(userCredential.user);
//         setError(null);
//         Alert.alert("Success", "User signed in with Google!");
//       } else {
//         throw new Error("Google Sign-In failed. No ID token received.");
//       }
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   // Function to handle logout
//   const logout = async () => {
//     try {
//       await auth().signOut();
//       setUserInfo(null);
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//       Alert.alert("Success", "User logged out!");
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     GoogleSignin.configure({
//       offlineAccess: true,
//       forceCodeForRefreshToken: true, // Optional for Android
//     });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>{error && `Error: ${error}`}</Text>
//       {userInfo && (
//         <Text>Welcome, {userInfo.displayName || userInfo.email}!</Text>
//       )}
//       {userInfo ? (
//         <Button title="Logout" onPress={logout} />
//       ) : (
//         <View>
//           <GoogleSigninButton
//             onPress={googleSignIn}
//             size={GoogleSigninButton.Size.Standard}
//             color={GoogleSigninButton.Color.Dark}
//           />
//           {/* Add Sign In and Sign Up buttons */}
//           <Button
//             title="Sign Up (Email)"
//             onPress={() => signUpWithEmail("test@example.com", "password123")}
//           />
//           <Button
//             title="Sign In (Email)"
//             onPress={() => signInWithEmail("test@example.com", "password123")}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
// });

// import React, { Children, useEffect, useState } from "react";
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
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// // import { auth } from "../config/firebaseConfig";
// import { useNavigation } from "@react-navigation/native";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import auth from "@react-native-firebase/auth";
// // import { GoogleSignin } from '@react-native-google-signin/google-signin';
// interface SignUpScreenProps {
//   navigateToScreen?: (screen: string) => void;
// }

// const SignUpScreen: React.FC<SignUpScreenProps> = ({
//   navigateToScreen = () => {},
// }) => {
//   // const [name, setName] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [showPassword, setShowPassword] = useState(false);

//   // const [nameError, setNameError] = useState("");
//   // const [emailError, setEmailError] = useState("");
//   // const [passwordError, setPasswordError] = useState("");
//   // const navigation: any = useNavigation();

//   // const handleSignUp = async () => {
//   //   let valid = true;

//   //   if (!name) {
//   //     setNameError("This field is required!");
//   //     valid = false;
//   //   } else {
//   //     setNameError("");
//   //   }

//   //   if (!email) {
//   //     setEmailError("This field is required!");
//   //     valid = false;
//   //   } else {
//   //     setEmailError("");
//   //   }

//   //   if (!password) {
//   //     setPasswordError("This field is required!");
//   //     valid = false;
//   //   } else {
//   //     setPasswordError("");
//   //   }

//   //   if (!valid) return;

//   //   try {
//   //     await createUserWithEmailAndPassword(auth, email, password);
//   //     Alert.alert("Success", "Account created successfully!");
//   //     navigateToScreen("SignIn");
//   //   } catch (error: any) {
//   //     if (error.code === "auth/email-already-in-use") {
//   //       Alert.alert("Error", "This email is already in use.");
//   //     } else {
//   //       Alert.alert("Error", error.message);
//   //     }
//   //   }
//   // };

//   // const handleGoogleSignUp = async () => {
//   //   try {
//   //     await GoogleSignin.hasPlayServices({
//   //       showPlayServicesUpdateDialog: true,
//   //     });
//   //     // Get the users ID token
//   //     const signInResult = await GoogleSignin.signIn();
//   //     let idToken = signInResult.data?.idToken;
//   //     if (!idToken) {
//   //       // if you are using older versions of google-signin, try old style result
//   //       idToken = signInResult?.idToken;
//   //     }
//   //     if (!idToken) {
//   //       throw new Error("No ID token found");
//   //     }

//   //     // Create a Google credential with the token
//   //     const googleCredential = auth.GoogleAuthProvider.credential(
//   //       signInResult?.data?.token
//   //     );

//   //     // Sign-in the user with the credential
//   //     return auth().signInWithCredential(googleCredential);
//   //     // const provider = new GoogleAuthProvider();
//   //     // await signInWithPopup(auth, provider);
//   //     // navigateToScreen("Home");
//   //   } catch (error: any) {
//   //     Alert.alert("Error", error.message);
//   //   }
//   // };

//   // async function onGoogleButtonPress() {
//   //   // Check if your device supports Google Play
//   //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//   //   // Get the users ID token
//   //   const signInResult = await GoogleSignin.signIn();

//   //   // Try the new style of google-sign in result, from v13+ of that module
//   //   let idToken = signInResult?.data?.idToken;
//   //   if (!idToken) {
//   //     // if you are using older versions of google-signin, try old style result
//   //     idToken = signInResult?.idToken;
//   //   }
//   //   if (!idToken) {
//   //     throw new Error("No ID token found");
//   //   }

//   //   // Create a Google credential with the token
//   //   const googleCredential = auth.GoogleAuthProvider.credential(
//   //     signInResult?.data?.token
//   //   );

//   //   // Sign-in the user with the credential
//   //   return auth().signInWithCredential(googleCredential);
//   // }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigateToScreen("SignIn")}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Sign Up</Text>
//       </View>

//       {/* Google Sign Up */}
//       <TouchableOpacity
//         style={styles.googleButton}
//         onPress={() =>
//           onGoogleButtonPress().then(() =>
//             console.log("Signed in with Google!")
//           )
//         }
//       >
//         <Image
//           source={{
//             uri: "https://www.cdnlogo.com/logos/g/35/google-icon.svg",
//           }}
//           style={styles.googleIcon}
//         />
//         <Text
//           style={styles.googleButtonText}
//           onPress={() =>
//             onGoogleButtonPress().then(() =>
//               console.log("Signed in with Google!")
//             )
//           }
//         >
//           Sign Up with Google
//         </Text>
//       </TouchableOpacity>

//       {/* Footer */}
//       <Text style={styles.footerText}>Already have an account? </Text>
//     </View>
//   );
// };

// export default SignUpScreen;

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
//   signUpButton: {
//     height: 50,
//     backgroundColor: "#7f3dff",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   signUpButtonText: {
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
// });
