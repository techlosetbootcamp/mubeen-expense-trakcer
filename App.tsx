import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store, { AppDispatch, useAppDispatch } from "./src/store/store"; // Import AppDispatch
import StackNavigation from "./src/navigation/StackNavigation";
import { loadCurrency, loadUserFromFirebase } from "./src/store/slices/userSlice";
import { fetchNotifications } from "./src/store/slices/BudgetSlice";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./src/config/firebaseConfig";
import * as Notifications from "expo-notifications";

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const AppWrapper = () => {
  const dispatch = useAppDispatch();
  const [initializing, setInitializing] = useState<boolean>(true);
  const [initialUser, setInitialUser] = useState<User | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
      }
    };
    requestPermissions();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      setInitialUser(firebaseUser);
      if (firebaseUser) {
        try {
          await dispatch(loadUserFromFirebase()).unwrap();
          await dispatch(fetchNotifications()).unwrap();
        } catch (error) {
          console.error("Error loading user or notifications:", error);
        }
      } else {
        dispatch({ type: "user/clearUser" }); // Action to clear user
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    dispatch(loadCurrency());

    return () => {
      unsubscribe();
    };
  }, [dispatch, initializing]);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <StackNavigation initialUser={initialUser} />
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

export default App;