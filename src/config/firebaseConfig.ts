import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: 'AIzaSyBDa2wJ5618ctuM1RsLtyKMjNPifOvIq14',
  projectId: 'expenseapp-3b41c',
  storageBucket: 'expenseapp-3b41c.appspot.com',
  appId: '1:1012175150020:android:712b36419970c574602291',
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const database = getDatabase(app);
export const storage = getStorage(app);

export default app;