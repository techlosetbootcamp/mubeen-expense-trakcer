import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import incomeReducer from "./slices/incomeSlice";
import expenseReducer from "./slices/expenseSlice";
import authReducer from "./slices/authSlice";
import budgetReducer from './slices/BudgetSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    income: incomeReducer,
    expense: expenseReducer,
    auth: authReducer,
    budget: budgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
