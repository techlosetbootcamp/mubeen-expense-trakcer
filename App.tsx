import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import store from "./src/store/store";
import StackNavigation from "./src/navigation/StackNavigation";
import { loadCurrency } from "./src/store/slices/userSlice";

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrency() as any); // Load currency from AsyncStorage
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

export default App;