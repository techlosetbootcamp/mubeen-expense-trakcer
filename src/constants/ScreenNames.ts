import AuthenticationScreen from "../screens/authenticationScreen/AuthenticationScreen";
import TabBar from "../components/tabBar/TabBar";
import AddIncome from "../screens/addIncome/AddIncome";
import AddExpense from "../screens/addExpense/AddExpense";
import UpdateProfile from "../screens/updateProfile/UpdateProfile";
import Profile from "../screens/profile/Profile";
import FinancialReport from "../screens/financialReport/FinancialReport";
import Transactions from "../screens/transactions/Transactions";
import ForgotPasswordScreen from "../screens/forgotPasswordScreen/ForgotPasswordScreen";
import Setting from "../screens/setting/Setting";
import DetailTransaction from "../screens/transactionsDetail/TransactionsDetail";

export const authScreens = [
  { name: "Authentication", component: AuthenticationScreen },
  { name: "ForgotPassword", component: ForgotPasswordScreen }
];

export const mainScreens = [
  { name: "Main", component: TabBar },
  { name: "AddIncome", component: AddIncome },
  { name: "AddExpense", component: AddExpense },
  { name: "UpdateProfile", component: UpdateProfile },
  { name: "Profile", component: Profile },
  { name: "FinancialReport", component: FinancialReport },
  { name: "Transactions", component: Transactions },
  { name: "AuthenticationScreen", component: AuthenticationScreen},
  { name: "ResetPassword", component: ForgotPasswordScreen },
  { name: "Setting", component: Setting },
  { name: "DetailTransaction", component: DetailTransaction }
  
];
