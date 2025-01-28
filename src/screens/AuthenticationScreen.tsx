import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices";

const FIREBASE_API_KEY = "AIzaSyBDa2wJ5618ctuM1RsLtyKMjNPifOvIq14";

const AuthenticationScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleAuthentication = async () => {
    if (!email || !password || (!isLogin && !username)) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;

    const payload = {
      email,
      password,
      returnSecureToken: true,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Authentication failed");
      }

      const data = await response.json();

      if (!isLogin) {
        // Update the user's display name
        await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idToken: data.idToken,
              displayName: username,
              returnSecureToken: true,
            }),
          }
        );
      }

      // Dispatch user data to Redux store
      dispatch(
        setUser({
          uid: data.localId,
          email: data.email,
          displayName: isLogin ? data.displayName : username,
          photoURL: data.photoUrl || "",
        })
      );

      Alert.alert(
        "Success",
        isLogin ? "Logged in successfully!" : "Account created successfully!"
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      <Text>{isLogin ? "Login" : "Sign Up"}</Text>
      {!isLogin && (
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      )}
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={isLogin ? "Login" : "Sign Up"}
        onPress={handleAuthentication}
      />
      <Button
        title={isLogin ? "Switch to Sign Up" : "Switch to Login"}
        onPress={() => setIsLogin(!isLogin)}
      />
    </View>
  );
};

export default AuthenticationScreen;

// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

// const FIREBASE_API_KEY = "AIzaSyBDa2wJ5618ctuM1RsLtyKMjNPifOvIq14"; // Replace with your Firebase API key

// const AuthenticationScreen: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");

//   const handleAuthentication = async () => {
//     if (!email || !password || (!isLogin && !username)) {
//       Alert.alert("Error", "Please fill in all fields.");
//       return;
//     }

//     const url = isLogin
//       ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`
//       : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;

//     const payload = {
//       email,
//       password,
//       returnSecureToken: true,
//     };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error.message || "Authentication failed");
//       }

//       const data = await response.json();

//       if (isLogin) {
//         Alert.alert("Success", "Logged in successfully!");
//       } else {
//         // Update the user's display name (optional)
//         await fetch(
//           `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               idToken: data.idToken,
//               displayName: username,
//               returnSecureToken: true,
//             }),
//           }
//         );
//         Alert.alert("Success", "Account created successfully!");
//       }
//     } catch (error: any) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>

//       {!isLogin && (
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           value={username}
//           onChangeText={setUsername}
//         />
//       )}

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <Button
//         title={isLogin ? "Login" : "Sign Up"}
//         onPress={handleAuthentication}
//       />

//       <Button
//         title={isLogin ? "Switch to Sign Up" : "Switch to Login"}
//         onPress={() => setIsLogin(!isLogin)}
//         color="gray"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 16,
//     backgroundColor: "#fff",
//   },
// });

// export default AuthenticationScreen;

// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import auth from "@react-native-firebase/auth";

// const AuthenticationScreen: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");

//   const handleAuthentication = async () => {
//     if (!email || !password || (!isLogin && !username)) {
//       Alert.alert("Error", "Please fill in all fields.");
//       return;
//     }

//     try {
//       if (isLogin) {
//         // Log in user
//         await auth().signInWithEmailAndPassword(email, password);
//         Alert.alert("Success", "Logged in successfully!");
//       } else {
//         // Sign up user
//         const userCredential = await auth().createUserWithEmailAndPassword(
//           email,
//           password
//         );
//         const user = userCredential.user;

//         if (user) {
//           await user.updateProfile({ displayName: username });
//           Alert.alert("Success", "Account created successfully!");
//         }
//       }
//     } catch (error: any) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>

//       {!isLogin && (
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           value={username}
//           onChangeText={setUsername}
//         />
//       )}

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <Button
//         title={isLogin ? "Login" : "Sign Up"}
//         onPress={handleAuthentication}
//       />

//       <Button
//         title={isLogin ? "Switch to Sign Up" : "Switch to Login"}
//         onPress={() => setIsLogin(!isLogin)}
//         color="gray"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 16,
//     backgroundColor: "#fff",
//   },
// });

// export default AuthenticationScreen;

// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, Button, Text, Alert } from "react-native";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
// import Constants from "expo-constants";
// import { makeRedirectUri } from "expo-auth-session";

// // Ensure the auth session is completed
// WebBrowser.maybeCompleteAuthSession();

// export default function App() {
//   const [userInfo, setUserInfo] = useState<any>(null);

//   // Google Client ID (from your provided ID)
//   const GOOGLE_CLIENT_ID =
//     "1012175150020-v0vr1eqfb9oidsbhqmkhvv55m4f11b3j.apps.googleusercontent.com";
//   // Create the Google Auth request
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: GOOGLE_CLIENT_ID,
//     scopes: ["profile", "email"], // Request profile and email scopes
//     redirectUri: makeRedirectUri({
//       scheme: "app1", // Replace with your app's scheme
//       useProxy: Constants.appOwnership === "expo", // Use proxy in development
//     }),
//   });

//   // Handle response from Google
//   useEffect(() => {
//     if (response?.type === "success") {
//       const { authentication } = response;
//       fetchUserInfo(authentication?.accessToken);
//     } else if (response?.type === "error") {
//       Alert.alert("Authorization Error", "Failed to authenticate with Google.");
//       console.error("Google Auth Error:", response?.error);
//     }
//   }, [response]);

//   // Fetch user info from Google API
//   const fetchUserInfo = async (token: string | undefined) => {
//     if (!token) {
//       Alert.alert("Error", "Access token is undefined.");
//       return;
//     }

//     try {
//       const userResponse = await fetch(
//         "https://www.googleapis.com/userinfo/v2/me",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const user = await userResponse.json();
//       setUserInfo(user);
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//       Alert.alert("Error", "Failed to fetch user info.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {!userInfo ? (
//         <Button
//           title="Sign in with Google"
//           disabled={!request}
//           onPress={() => {
//             promptAsync();
//           }}
//         />
//       ) : (
//         <View>
//           <Text style={styles.text}>Welcome, {userInfo.name}</Text>
//           <Text style={styles.text}>Email: {userInfo.email}</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 18,
//     marginVertical: 8,
//   },
// });

// // import React, { useEffect, useState } from "react";
// // import { StyleSheet, View, Button, Text, Alert } from "react-native";
// // import * as Google from "expo-auth-session/providers/google";
// // import * as WebBrowser from "expo-web-browser";
// // import Constants from "expo-constants";
// // import { makeRedirectUri } from "expo-auth-session";

// // // Ensure the auth session is completed
// // WebBrowser.maybeCompleteAuthSession();

// // export default function App() {
// //   const [userInfo, setUserInfo] = useState<any>(null);
// //   const id = "1061115146692-4a1jskt6j0llmf09rdlal1s4rq7q1gns.apps.googleusercontent.com"

// //   // Fetch Google Client ID from environment variables
// //   const GOOGLE_CLIENT_ID = Constants.manifest?.extra?.GOOGLE_CLIENT_ID;

// //   // Create the Google Auth request
// //   const [request, response, promptAsync] = Google.useAuthRequest({
// //     androidClientId: GOOGLE_CLIENT_ID,
// //     scopes: ["profile", "email"], // Request profile and email scopes
// //     redirectUri: makeRedirectUri({
// //       scheme: "app1", // Replace with your scheme
// //       useProxy: Constants.appOwnership === "expo", // Use proxy in development
// //     }),
// //   });

// //   // Handle response from Google
// //   useEffect(() => {
// //     if (response?.type === "success") {
// //       const { authentication } = response;
// //       fetchUserInfo(authentication?.accessToken);
// //     } else if (response?.type === "error") {
// //       Alert.alert("Authorization Error", "Failed to authenticate with Google.");
// //       console.error("Google Auth Error:", response?.error);
// //     }
// //   }, [response]);

// //   // Fetch user info from Google API
// //   const fetchUserInfo = async (token: string | undefined) => {
// //     if (!token) {
// //       Alert.alert("Error", "Access token is undefined.");
// //       return;
// //     }

// //     try {
// //       const userResponse = await fetch(
// //         "https://www.googleapis.com/userinfo/v2/me",
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       const user = await userResponse.json();
// //       setUserInfo(user);
// //     } catch (error) {
// //       console.error("Error fetching user info:", error);
// //       Alert.alert("Error", "Failed to fetch user info.");
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {!userInfo ? (
// //         <Button
// //           title="Sign in with Google"
// //           disabled={!request}
// //           onPress={() => {
// //             promptAsync();
// //           }}
// //         />
// //       ) : (
// //         <View>
// //           <Text style={styles.text}>Welcome, {userInfo.name}</Text>
// //           <Text style={styles.text}>Email: {userInfo.email}</Text>
// //         </View>
// //       )}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   text: {
// //     fontSize: 18,
// //     marginVertical: 8,
// //   },
// // });

// // import React from "react";
// // import { StyleSheet, View, Button, Text, Alert } from "react-native";
// // import * as Google from "expo-auth-session/providers/google";
// // import * as WebBrowser from "expo-web-browser";
// // import Constants from "expo-constants";
// // import { makeRedirectUri } from "expo-auth-session";

// // // Ensures the auth session is completed
// // WebBrowser.maybeCompleteAuthSession();

// // export default function App() {
// //   const [userInfo, setUserInfo] = React.useState<any>(null);

// //   const [request, response, promptAsync] = Google.useAuthRequest({
// //     androidClientId: Constants.expoConfig?.extra?.GOOGLE_CLIENT_ID,
// //     redirectUri: makeRedirectUri({
// //       scheme: "app1",
// //       useProxy: true, // Ensures it works with the managed workflow
// //       natives: true, // Ensures it works with the native Android app
// //     }),
// //   });

// //   React.useEffect(() => {
// //     if (response?.type === "success") {
// //       fetchUserInfo(response.authentication?.accessToken);
// //     } else if (response?.type === "error") {
// //       Alert.alert("Error", response.error.message);
// //     }
// //   }, [response]);

// //   const fetchUserInfo = async (token: string | undefined) => {
// //     if (!token) return;
// //     try {
// //       const userResponse = await fetch(
// //         "https://www.googleapis.com/userinfo/v2/me",
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       const user = await userResponse.json();
// //       setUserInfo(user);
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to fetch user info.");
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {!userInfo ? (
// //         <Button
// //           title="Sign in with Google"
// //           disabled={!request}
// //           onPress={() => {
// //             promptAsync();
// //           }}
// //         />
// //       ) : (
// //         <View>
// //           <Text>Welcome, {userInfo.name}</Text>
// //           <Text>Email: {userInfo.email}</Text>
// //         </View>
// //       )}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// // });

// // import {
// //   StyleSheet,
// //   Text,
// //   ToastAndroid,
// //   View,
// //   TouchableOpacity,
// // } from "react-native";
// // import React from "react";
// // import { GoogleSignin } from "@react-native-google-signin/google-signin";
// // import auth from "@react-native-firebase/auth";
// // import { useDispatch } from "react-redux";
// // import { googleLoginFailure, googleLoginSuccess } from "../store/slices";

// // const AuthenticationScreen = () => {
// //   const dispatch = useDispatch();

// //   GoogleSignin.configure({
// //     webClientId:
// //       "1061115146692-4a1jskt6j0llmf09rdlal1s4rq7q1gns.apps.googleusercontent.com",
// //   });

// //   const onGoogleButtonPress = async () => {
// //     try {
// //       await GoogleSignin.hasPlayServices({
// //         showPlayServicesUpdateDialog: true,
// //       });
// //       // const userInfo = await GoogleSignin.signIn();
// //       const signInResponse = await GoogleSignin.signIn();
// //       // const { data } = userInfo;
// //       const { data } = signInResponse;
// //       // console.log(userInfo.data?.idToken)
// //       if (!data?.idToken) {
// //         throw new Error("Google Sign-In failed: idToken is null.");
// //       }
// //       const googleCredential = auth.GoogleAuthProvider.credential(
// //         data?.idToken
// //       );

// //       const response = await auth().signInWithCredential(googleCredential);
// //       const { uid, email, displayName, photoURL } = response.user;
// //       dispatch(googleLoginSuccess({ uid, email, displayName, photoURL }));
// //       ToastAndroid.show("Google login successful!", ToastAndroid.LONG);
// //     } catch (err) {
// //       const erro = err as Error;
// //       dispatch(googleLoginFailure(erro.message));
// //       console.log(erro.message);
// //       ToastAndroid.show(
// //         "Google login failed. Please try again.",
// //         ToastAndroid.LONG
// //       );
// //     }
// //   };

// //   return (
// //     <View style={{ marginTop: 80 }}>
// //       <TouchableOpacity onPress={onGoogleButtonPress}>
// //         Continue with google
// //       </TouchableOpacity>
// //       <Text>AuthenticationScreen</Text>
// //     </View>
// //   );
// // };

// // export default AuthenticationScreen;

// // const styles = StyleSheet.create({});

// // import React, { useState } from "react";
// // import {
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   View,
// //   TouchableOpacity,
// //   Button,
// //   Alert,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import auth from "@react-native-firebase/auth";

// // const AuthenticationScreen = () => {
// //   const [fullName, setFullName] = useState<string>("");
// //   const [email, setEmail] = useState<string>("");
// //   const [password, setPassword] = useState<string>("");
// //   const [confirmPassword, setConfirmPassword] = useState<string>("");
// //   const [showPassword, setShowPassword] = useState<boolean>(false);
// //   const [showConfirmPassword, setShowConfirmPassword] =
// //     useState<boolean>(false);

// //   const handleSignUp = () => {
// //     console.log("Full Name:", fullName);
// //     console.log("Email:", email);
// //     console.log("Password:", password);
// //     console.log("Confirm Password:", confirmPassword);
// //   };

// //   const signUpTextFn = () => {
// //     auth()
// //       .createUserWithEmailAndPassword("Email", "Password")
// //       .then(() => {
// //         Alert.alert("User created");
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Sign Up</Text>
// //       <Text style={styles.subHeader}>First create your account</Text>

// //       <TextInput
// //         style={styles.input}
// //         placeholder="Full Name"
// //         value={fullName}
// //         onChangeText={setFullName}
// //       />

// //       <TextInput
// //         style={styles.input}
// //         placeholder="Email"
// //         keyboardType="email-address"
// //         value={email}
// //         onChangeText={setEmail}
// //       />

// //       <View style={styles.passwordContainer}>
// //         <TextInput
// //           style={styles.passwordInput}
// //           placeholder="Password"
// //           secureTextEntry={!showPassword}
// //           value={password}
// //           onChangeText={setPassword}
// //         />
// //         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
// //           <Ionicons
// //             name={showPassword ? "eye-off" : "eye"}
// //             size={20}
// //             color="orange"
// //           />
// //         </TouchableOpacity>
// //       </View>

// //       <View style={styles.passwordContainer}>
// //         <TextInput
// //           style={styles.passwordInput}
// //           placeholder="Confirm your password"
// //           secureTextEntry={!showConfirmPassword}
// //           value={confirmPassword}
// //           onChangeText={setConfirmPassword}
// //         />
// //         <TouchableOpacity
// //           onPress={() => setShowConfirmPassword(!showConfirmPassword)}
// //         >
// //           <Ionicons
// //             name={showConfirmPassword ? "eye-off" : "eye"}
// //             size={20}
// //             color="orange"
// //           />
// //         </TouchableOpacity>
// //       </View>

// //       <TouchableOpacity style={styles.signUpButton} onPress={signUpTextFn}>
// //         <Text style={styles.signUpButtonText}>SIGN UP</Text>
// //       </TouchableOpacity>

// //       <Text style={styles.footerText}>
// //         Already have an account? <Text style={styles.linkText}>Login</Text>
// //       </Text>

// //       <TouchableOpacity>
// //         <Text style={styles.skipText}>Skip now --&gt;</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // export default AuthenticationScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     justifyContent: "center",
// //     backgroundColor: "#fff",
// //   },
// //   header: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     marginBottom: 8,
// //   },
// //   subHeader: {
// //     fontSize: 14,
// //     color: "gray",
// //     textAlign: "center",
// //     marginBottom: 20,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: "gray",
// //     borderRadius: 5,
// //     padding: 10,
// //     marginVertical: 10,
// //   },
// //   passwordContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     borderWidth: 1,
// //     borderColor: "gray",
// //     borderRadius: 5,
// //     padding: 10,
// //     marginVertical: 10,
// //   },
// //   passwordInput: {
// //     flex: 1,
// //   },
// //   signUpButton: {
// //     backgroundColor: "black",
// //     paddingVertical: 12,
// //     borderRadius: 5,
// //     marginVertical: 20,
// //     alignItems: "center",
// //   },
// //   signUpButtonText: {
// //     color: "white",
// //     fontWeight: "bold",
// //     fontSize: 16,
// //   },
// //   footerText: {
// //     textAlign: "center",
// //     color: "gray",
// //     marginTop: 20,
// //   },
// //   linkText: {
// //     color: "orange",
// //     fontWeight: "bold",
// //   },
// //   skipText: {
// //     textAlign: "center",
// //     color: "gray",
// //     marginTop: 10,
// //   },
// // });

// // import { StyleSheet, Text, View, Button } from "react-native";
// // import React, { useState } from "react";
// // import {
// //   GoogleSignin,
// //   isErrorWithCode,
// //   isSuccessResponse,
// //   statusCodes,
// // } from "@react-native-google-signin/google-signin";

// // const AuthenticationScreen = () => {
// //   const [userInfo, setUserInfo] = useState<any>(null); // Use useState to manage user info

// //   const signIn = async () => {
// //     try {
// //       await GoogleSignin.hasPlayServices();
// //       const response = await GoogleSignin.signIn();
// //       if (isSuccessResponse(response)) {
// //         setUserInfo(response.data); // Update state using setUserInfo
// //       } else {
// //         // sign in was cancelled by user
// //         console.log("Sign-in was cancelled by user.");
// //       }
// //     } catch (error) {
// //       if (isErrorWithCode(error)) {
// //         switch (error.code) {
// //           case statusCodes.IN_PROGRESS:
// //             console.log("Operation already in progress.");
// //             break;
// //           case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
// //             console.log("Play services not available or outdated.");
// //             break;
// //           default:
// //             console.error("An error occurred:", error.message);
// //         }
// //       } else {
// //         console.error("Non-Google Sign-In error:", error);
// //       }
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text>AuthenticationScreen</Text>
// //       <Button title="Sign In with Google" onPress={signIn} />
// //       {userInfo && (
// //         <Text style={styles.userInfo}>Welcome, {userInfo.name}</Text>
// //       )}
// //     </View>
// //   );
// // };

// // export default AuthenticationScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   userInfo: {
// //     marginTop: 20,
// //     fontSize: 16,
// //     color: "green",
// //   },
// // });

// // import { Button, StyleSheet, Text, View } from "react-native";
// // import React, { useEffect } from "react";
// // import { GoogleSignin } from "@react-native-google-signin/google-signin";
// // import auth from "@react-native-firebase/auth";

// // const AuthenticationScreen = () => {
// //   useEffect(() => {
// //     GoogleSignin.configure({
// //       webClientId:
// //         "1061115146692-4a1jskt6j0llmf09rdlal1s4rq7q1gns.apps.googleusercontent.com",
// //     });
// //   }, []);

// //   async function onGoogleButtonPress() {
// //     // Check if your device supports Google Play
// //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
// //     // Get the users ID token
// //     const signInResult = await GoogleSignin.signIn();

// //     // Try the new style of google-sign in result, from v13+ of that module
// //     let idToken = signInResult.data?.idToken;
// //     if (!idToken) {
// //       // if you are using older versions of google-signin, try old style result
// //       idToken = signInResult?.idToken;
// //     }
// //     if (!idToken) {
// //       throw new Error("No ID token found");
// //     }

// //     // Create a Google credential with the token
// //     const googleCredential = auth.GoogleAuthProvider.credential(
// //       signInResult?.data?.token
// //     );
// //     // Sign-in the user with the credential
// //     return auth().signInWithCredential(googleCredential);
// //   }

// //   return (
// //     <View>
// //       <Text>AuthenticationScreen</Text>
// //       <Button title="Continue with Google" onPress={onGoogleButtonPress} />
// //     </View>
// //   );
// // };

// // export default AuthenticationScreen;

// // const styles = StyleSheet.create({});

// // import React, { Children, useEffect, useState } from "react";
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   TextInput,
// //   TouchableOpacity,
// //   Image,
// //   Alert,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import {
// //   createUserWithEmailAndPassword,
// //   GoogleAuthProvider,
// //   signInWithPopup,
// // } from "firebase/auth";
// // // import { auth } from "../config/firebaseConfig";
// // import { useNavigation } from "@react-navigation/native";
// // import { GoogleSignin } from "@react-native-google-signin/google-signin";
// // import auth from "@react-native-firebase/auth";
// // // import { GoogleSignin } from '@react-native-google-signin/google-signin';
// // interface SignUpScreenProps {
// //   navigateToScreen?: (screen: string) => void;
// // }

// // const SignUpScreen: React.FC<SignUpScreenProps> = ({
// //   navigateToScreen = () => {},
// // }) => {
// //   // const [name, setName] = useState("");
// //   // const [email, setEmail] = useState("");
// //   // const [password, setPassword] = useState("");
// //   // const [showPassword, setShowPassword] = useState(false);

// //   // const [nameError, setNameError] = useState("");
// //   // const [emailError, setEmailError] = useState("");
// //   // const [passwordError, setPasswordError] = useState("");
// //   // const navigation: any = useNavigation();

// //   // const handleSignUp = async () => {
// //   //   let valid = true;

// //   //   if (!name) {
// //   //     setNameError("This field is required!");
// //   //     valid = false;
// //   //   } else {
// //   //     setNameError("");
// //   //   }

// //   //   if (!email) {
// //   //     setEmailError("This field is required!");
// //   //     valid = false;
// //   //   } else {
// //   //     setEmailError("");
// //   //   }

// //   //   if (!password) {
// //   //     setPasswordError("This field is required!");
// //   //     valid = false;
// //   //   } else {
// //   //     setPasswordError("");
// //   //   }

// //   //   if (!valid) return;

// //   //   try {
// //   //     await createUserWithEmailAndPassword(auth, email, password);
// //   //     Alert.alert("Success", "Account created successfully!");
// //   //     navigateToScreen("SignIn");
// //   //   } catch (error: any) {
// //   //     if (error.code === "auth/email-already-in-use") {
// //   //       Alert.alert("Error", "This email is already in use.");
// //   //     } else {
// //   //       Alert.alert("Error", error.message);
// //   //     }
// //   //   }
// //   // };

// //   // const handleGoogleSignUp = async () => {
// //   //   try {
// //   //     await GoogleSignin.hasPlayServices({
// //   //       showPlayServicesUpdateDialog: true,
// //   //     });
// //   //     // Get the users ID token
// //   //     const signInResult = await GoogleSignin.signIn();
// //   //     let idToken = signInResult.data?.idToken;
// //   //     if (!idToken) {
// //   //       // if you are using older versions of google-signin, try old style result
// //   //       idToken = signInResult?.idToken;
// //   //     }
// //   //     if (!idToken) {
// //   //       throw new Error("No ID token found");
// //   //     }

// //   //     // Create a Google credential with the token
// //   //     const googleCredential = auth.GoogleAuthProvider.credential(
// //   //       signInResult?.data?.token
// //   //     );

// //   //     // Sign-in the user with the credential
// //   //     return auth().signInWithCredential(googleCredential);
// //   //     // const provider = new GoogleAuthProvider();
// //   //     // await signInWithPopup(auth, provider);
// //   //     // navigateToScreen("Home");
// //   //   } catch (error: any) {
// //   //     Alert.alert("Error", error.message);
// //   //   }
// //   // };

// //   // async function onGoogleButtonPress() {
// //   //   // Check if your device supports Google Play
// //   //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
// //   //   // Get the users ID token
// //   //   const signInResult = await GoogleSignin.signIn();

// //   //   // Try the new style of google-sign in result, from v13+ of that module
// //   //   let idToken = signInResult?.data?.idToken;
// //   //   if (!idToken) {
// //   //     // if you are using older versions of google-signin, try old style result
// //   //     idToken = signInResult?.idToken;
// //   //   }
// //   //   if (!idToken) {
// //   //     throw new Error("No ID token found");
// //   //   }

// //   //   // Create a Google credential with the token
// //   //   const googleCredential = auth.GoogleAuthProvider.credential(
// //   //     signInResult?.data?.token
// //   //   );

// //   //   // Sign-in the user with the credential
// //   //   return auth().signInWithCredential(googleCredential);
// //   // }

// //   return (
// //     <View style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.headerContainer}>
// //         <TouchableOpacity onPress={() => navigateToScreen("SignIn")}>
// //           <Ionicons name="arrow-back" size={24} color="#000" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerText}>Sign Up</Text>
// //       </View>

// //       {/* Google Sign Up */}
// //       <TouchableOpacity
// //         style={styles.googleButton}
// //         onPress={() =>
// //           onGoogleButtonPress().then(() =>
// //             console.log("Signed in with Google!")
// //           )
// //         }
// //       >
// //         <Image
// //           source={{
// //             uri: "https://www.cdnlogo.com/logos/g/35/google-icon.svg",
// //           }}
// //           style={styles.googleIcon}
// //         />
// //         <Text
// //           style={styles.googleButtonText}
// //           onPress={() =>
// //             onGoogleButtonPress().then(() =>
// //               console.log("Signed in with Google!")
// //             )
// //           }
// //         >
// //           Sign Up with Google
// //         </Text>
// //       </TouchableOpacity>

// //       {/* Footer */}
// //       <Text style={styles.footerText}>Already have an account? </Text>
// //     </View>
// //   );
// // };

// // export default SignUpScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     paddingHorizontal: 20,
// //     backgroundColor: "#fff",
// //   },
// //   headerContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginTop: 40,
// //     marginBottom: 70,
// //   },
// //   headerText: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     marginLeft: 10,
// //     textAlign: "center",
// //     paddingHorizontal: 70,
// //     marginBottom: 1,
// //   },
// //   input: {
// //     height: 50,
// //     borderColor: "#e5e5e5",
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     paddingHorizontal: 15,
// //     marginVertical: 10,
// //   },
// //   passwordContainer: {
// //     position: "relative",
// //     width: "100%",
// //   },
// //   errorText: {
// //     width: "90%",
// //     color: "red",
// //     fontSize: 12,
// //     marginBottom: 10,
// //   },
// //   eyeIcon: {
// //     position: "absolute",
// //     right: 15,
// //     top: 15,
// //   },
// //   checkboxContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginVertical: 10,
// //   },
// //   checkbox: {
// //     width: 20,
// //     height: 20,
// //     borderRadius: 4,
// //     borderWidth: 1,
// //     borderColor: "#e5e5e5",
// //     marginRight: 10,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   termsText: {
// //     fontSize: 14,
// //     color: "#9e9e9e",
// //     flex: 1,
// //   },
// //   linkText: {
// //     color: "#7f3dff",
// //     textDecorationLine: "underline",
// //   },
// //   signUpButton: {
// //     height: 50,
// //     backgroundColor: "#7f3dff",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: 8,
// //     marginVertical: 10,
// //   },
// //   signUpButtonText: {
// //     color: "#fff",
// //     fontWeight: "bold",
// //     fontSize: 16,
// //   },
// //   orText: {
// //     textAlign: "center",
// //     color: "#9e9e9e",
// //     marginVertical: 10,
// //   },
// //   googleButton: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     height: 50,
// //     borderColor: "#e5e5e5",
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     marginVertical: 10,
// //   },
// //   googleIcon: {
// //     width: 20,
// //     height: 20,
// //     marginRight: 10,
// //   },
// //   googleButtonText: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //     color: "#616161",
// //   },
// //   footerText: {
// //     textAlign: "center",
// //     marginVertical: 20,
// //     color: "#9e9e9e",
// //   },
// // });
