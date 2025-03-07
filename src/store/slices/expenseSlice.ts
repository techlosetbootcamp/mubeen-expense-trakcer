import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, push } from "firebase/database";
import { auth, database } from "../../config/firebaseConfig";

export interface Expense {
    amount: string;
    category: string;
    description: string;
    attachment: string | null;
    timestamp: string;
}

interface ExpenseState {
    expenses: Expense[];
    loading: boolean; 
    error: string | null; 
}

const initialState: ExpenseState = {
    expenses: [],
    loading: false,
    error: null,
};

export const fetchExpenses = createAsyncThunk("expense/fetchExpenses", async () => {
    const user = auth?.currentUser;
    if (!user) return [];

    const expensesRef = ref(database, `expenses/${user?.uid}`);
    const snapshot = await get(expensesRef);

    if (snapshot.exists()) {
        const expensesData = snapshot?.val();
        return Object?.values(expensesData) as Expense[];
    }
    return [];
});

export const addExpenseToFirebase = createAsyncThunk(
    "expense/addExpense",
    async (expense: Expense, { dispatch }) => {
        const user = auth?.currentUser;
        if (!user) throw new Error("User not logged in");

        const newExpenseRef = ref(database, `expenses/${user?.uid}`);
        const pushedExpenseRef = await push(newExpenseRef, expense);
        return { ...expense, id: pushedExpenseRef.key };
    }
);

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        setExpenses(state, action: PayloadAction<Expense[]>) {
            state.expenses = action?.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses?.fulfilled, (state, action) => {
                state.expenses = action?.payload;
            })
            .addCase(addExpenseToFirebase?.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addExpenseToFirebase?.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = [...state?.expenses, action?.payload as Expense];
            })
            .addCase(addExpenseToFirebase?.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message || "Failed to add expense";
            });
    },
});

export const { setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
