import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import store from './src/store/store';
import StackNavigation from './src/navigation/StackNavigation';
import { loadCurrency, loadUserFromFirebase } from './src/store/slices/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebaseConfig';

const AppWrapper = () => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [initialUser, setInitialUser] = useState<any>(null);

  useEffect(() => {
    console.log('App.tsx: Starting auth state check');
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('App.tsx onAuthStateChanged User:', firebaseUser ? firebaseUser.uid : null);
      setInitialUser(firebaseUser);
      if (firebaseUser) {
        dispatch(loadUserFromFirebase() as any);
      } else {
        dispatch({ type: 'user/clearUser' });
      }
      if (initializing) {
        console.log('App.tsx: First auth state resolved, setting initializing to false');
        setInitializing(false);
      }
    });

    dispatch(loadCurrency() as any);

    return () => {
      console.log('App.tsx: Unsubscribing from onAuthStateChanged');
      unsubscribe();
    };
  }, [dispatch, initializing]);

  if (initializing) {
    console.log('App.tsx: Still initializing, rendering null');
    return null; // Wait for first auth state resolution
  }

  console.log('App.tsx: Rendering NavigationContainer with initialUser:', initialUser ? initialUser.uid : null);
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