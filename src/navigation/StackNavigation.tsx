import { createStackNavigator } from '@react-navigation/stack';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { fetchIncome } from '../store/slices/incomeSlice';
import { fetchExpenses } from '../store/slices/expenseSlice';
import { useEffect, useRef, useState } from 'react';
import SplashScreen from '../screens/splashScree/SplashScreen';
import { authScreens, mainScreens } from '../constants/ScreenNames';
import { useNavigation } from '@react-navigation/native';

interface StackNavigationProps {
  initialUser: any;
}

const StackNavigation: React.FC<StackNavigationProps> = ({ initialUser }) => {
  const Stack = createStackNavigator();
  const navigation = useNavigation<any>();
  const hasNavigated = useRef(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const dispatch = useAppDispatch();
  const reduxUser = useAppSelector((state: RootState) => state.user.user);

  useEffect(() => {
    console.log('StackNavigation.tsx: Setting splash timer');
    const splashTimer = setTimeout(() => {
      setIsSplashVisible(false);
      console.log('StackNavigation.tsx: Splash timer complete, isSplashVisible set to false');
    }, 3000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    console.log('StackNavigation.tsx: Checking navigation with initialUser:', initialUser ? initialUser.uid : null);
    if (!isSplashVisible && !hasNavigated.current) {
      if (initialUser) {
        console.log('StackNavigation.tsx: Navigating to Main');
        dispatch(fetchIncome());
        dispatch(fetchExpenses());
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        console.log('StackNavigation.tsx: Navigating to Authentication');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Authentication' }],
        });
      }
      hasNavigated.current = true;
    }
  }, [isSplashVisible, initialUser, navigation, dispatch]);

  if (isSplashVisible) {
    console.log('StackNavigation.tsx: Rendering SplashScreen');
    return <SplashScreen />;
  }

  console.log('StackNavigation.tsx: Rendering Stack.Navigator with reduxUser:', reduxUser ? reduxUser.uid : null);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} id={initialUser}>
      {!reduxUser
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