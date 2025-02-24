import { createStackNavigator } from "@react-navigation/stack";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../store/slices/userSlice";
import { fetchIncome } from "../store/slices/incomeSlice";
import { get, ref } from "firebase/database";
import { auth, database } from "../config/firebaseConfig";
import { useEffect, useRef, useState } from "react";
import SplashScreen from "../screens/splashScree/SplashScreen";
import { authScreens, mainScreens } from "../constants/ScreenNames";
import { fetchExpenses } from "../store/slices/expenseSlice";
import { useNavigation } from "@react-navigation/native";

const StackNavigation: React.FC = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const hasNavigated = useRef(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);
    
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = ref(database, `users/${firebaseUser.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.exists()
          ? snapshot.val()
          : { displayName: "" };
  
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: userData.displayName || "",
            photoURL: firebaseUser.photoURL || "",
            income: [],
          })
        );
  
        dispatch(fetchIncome());
        dispatch(fetchExpenses());
  
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" as never }],
        });
      } else {
        dispatch(setUser(null as any));
      }
    });
  
    return () => unsubscribe();
  }, [dispatch, navigation]);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user
        ? authScreens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          ))
        : mainScreens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          ))}
    </Stack.Navigator>
  );
};

export default StackNavigation;
