import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import Realtime Database
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyBDa2wJ5618ctuM1RsLtyKMjNPifOvIq14",
    projectId: "expenseapp-3b41c",
    storageBucket: "expenseapp-3b41c.appspot.com", // Corrected storage bucket URL
    appId: "1:1012175150020:android:712b36419970c574602291",
    // messagingSenderId and authDomain are not required for Android
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app); // Initialize and export Realtime Database
export const storage = getStorage(app); // Initialize and export Firebase Storage

export default app;
