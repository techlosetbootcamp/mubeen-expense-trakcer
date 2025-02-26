import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Income } from "./incomeSlice";

interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    income: Income[];
}

export interface UserState {
    user: User | null;
    profilePicture: string;
    name: string;
    selectedCurrency: string; // Added currency field
}

const initialUserState: UserState = {
    user: null,
    profilePicture: "",
    name: "",
    selectedCurrency: "USD" // Default currency
};

// Async thunk to load currency from AsyncStorage
export const loadCurrency = createAsyncThunk(
    'user/loadCurrency',
    async () => {
        const currency = await AsyncStorage.getItem('selectedCurrency');
        return currency || "USD"; // Return default if no currency is stored
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.profilePicture = action.payload.photoURL || "";
            state.name = action.payload.displayName || "";
        },
        clearUser(state) {
            state.user = null;
            state.profilePicture = "";
            state.name = "";
        },
        setUserProfile(
            state,
            action: PayloadAction<{ profilePicture: string; name: string }>
        ) {
            state.profilePicture = action.payload.profilePicture;
            state.name = action.payload.name;
        },
        setCurrency(state, action: PayloadAction<string>) {
            state.selectedCurrency = action.payload;
            AsyncStorage.setItem('selectedCurrency', action.payload); // Persist currency to AsyncStorage
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadCurrency.fulfilled, (state, action) => {
            state.selectedCurrency = action.payload;
        });
    }
});

export const { setUser, clearUser, setUserProfile, setCurrency } = userSlice.actions;
export default userSlice.reducer;