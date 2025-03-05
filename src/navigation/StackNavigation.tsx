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
    const splashTimer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (!isSplashVisible && !hasNavigated.current) {
      if (initialUser) {
        dispatch(fetchIncome());
        dispatch(fetchExpenses());
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Authentication' }],
        });
      }
      hasNavigated.current = true;
    }
  }, [isSplashVisible, initialUser, navigation, dispatch]);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

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