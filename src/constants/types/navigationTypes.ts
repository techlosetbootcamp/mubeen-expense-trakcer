// src/types/navigationTypes.ts
import { NavigationProp, NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../store/store";

// Define the param list for your stack navigator
export type StackNavigationParamList = {
  Authentication: undefined; // No params
  Home: undefined; // Assuming a Home screen exists
  FinancialReport: undefined; // From FinancialReport.tsx
  Profile: undefined; // From Profile.tsx
  UpdateProfile: { username: string; profilePicture: string }; // From Profile.tsx navigation
  Setting: undefined; // From Profile.tsx navigation
  ResetPassword: undefined; // From Profile.tsx navigation
  Main: undefined
  ForgotPassword: undefined
};




