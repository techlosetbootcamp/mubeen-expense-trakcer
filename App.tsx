import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import store from "./src/store/store";
import StackNavigation from "./src/navigation/StackNavigation";
import { loadCurrency, loadUserFromFirebase } from "./src/store/slices/userSlice";
import { fetchNotifications } from "./src/store/slices/BudgetSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/config/firebaseConfig";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const AppWrapper = () => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [initialUser, setInitialUser] = useState<any>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
      }
    };
    requestPermissions();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setInitialUser(firebaseUser);
      if (firebaseUser) {
        try {
          await dispatch(loadUserFromFirebase() as any).unwrap(); // Wait for completion
          await dispatch(fetchNotifications() as any).unwrap();
        } catch (error) {
        }
      } else {
        dispatch({ type: "user/clearUser" });
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    dispatch(loadCurrency() as any);

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