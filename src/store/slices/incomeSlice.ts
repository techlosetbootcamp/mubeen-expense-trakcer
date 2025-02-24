import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { database, auth } from "../../config/firebaseConfig";
import { ref, get } from "firebase/database";

export interface Income {
  amount: string;
  category: string;
  description: string;
  attachment: string | null;
  timestamp: string;
}

export interface IncomeState {
  income: Income[];
}

const initialIncomeState: IncomeState = {
  income: [],
};

// Async thunk to fetch income from Firebase
export const fetchIncome = createAsyncThunk("income/fetchIncome", async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const incomeRef = ref(database, `incomes/${user.uid}`);
  const snapshot = await get(incomeRef);
  
  if (snapshot.exists()) {
    const incomeData = snapshot.val();
    return Object.values(incomeData) as Income[];
  }
  return [];
});

const incomeSlice = createSlice({
  name: "income",
  initialState: initialIncomeState,
  reducers: {
    setIncome(state, action: PayloadAction<Income[]>) {
      state.income = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIncome.fulfilled, (state, action) => {
      state.income = action.payload;
    });
  },
});

export const { setIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
