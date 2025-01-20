import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { auth } from "./src/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import SplashScreen from "./src/screens/SplashScreen";
// import SignUpScreen from "./src/screens/SignUpScreen";
// import { SignUpScreen } from "./src/screens/AuthenticationScreen";
// import SignInScreen from "./src/screens/SignInScreen";
// import { AuthenticationScreen } from "./src/screens/AuthenticationScreen";
import AuthenticationScreen from "./src/screens/AuthenticationScreen";
import TabBar from "./src/components/TabBar";
import Profile from "./src/screens/Profile";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import AddIncome from "./src/screens/AddIncome";
import AddExpense from "./src/screens/AddExpense";
import FinancialReport from "./src/screens/FinancialReport";
import Transactions from "./src/screens/Transactions";
import { Provider } from "react-redux";
import store from "./src/store/store";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Stack = createStackNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (authenticatedUser: any) => {
  //     setUser(authenticatedUser);
  //     setIsLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // if (isLoading) {
  //   return <SplashScreen />;
  // }
  // React.useEffect(() => {
  // GoogleSignin.configure({
  //   webClientId:
  //     "789890934872-2ia8n2hcjl5q7pbl6jqk7jvk6c2gn0ea.apps.googleusercontent.com",
  // });
  // }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="AuthenticationScreen"
            component={AuthenticationScreen}
          />
          {/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}

          <>
            <Stack.Screen name="Home" component={TabBar} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="AddIncome" component={AddIncome} />
            <Stack.Screen name="AddExpense" component={AddExpense} />
            <Stack.Screen name="FinancialReport" component={FinancialReport} />
            <Stack.Screen name="Transactions" component={Transactions} />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
