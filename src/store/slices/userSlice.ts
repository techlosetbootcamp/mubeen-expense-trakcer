import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Income } from "./incomeSlice";
import { auth, database } from "../../config/firebaseConfig"; // Import Firebase
import { get, ref } from "firebase/database";

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
    selectedCurrency: string;
}

const initialUserState: UserState = {
    user: null,
    profilePicture: "",
    name: "",
    selectedCurrency: "USD"
};

// Load user data from Firebase on app startup
export const loadUserFromFirebase = createAsyncThunk(
    'user/loadUserFromFirebase',
    async (_, { dispatch }) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = ref(database, `users/${user.uid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const profileData = {
                    profilePicture: userData.profilePicture || "",
                    name: userData.displayName || ""
                };
                dispatch(setUserProfile(profileData)); // Update Redux
                return {
                    uid: user.uid,
                    email: user.email,
                    displayName: userData.displayName,
                    photoURL: userData.profilePicture,
                    income: userData.income || []
                };
            }
        }
        return null;
    }
);

export const loadCurrency = createAsyncThunk(
    'user/loadCurrency',
    async () => {
        const currency = await AsyncStorage.getItem('selectedCurrency');
        return currency || "USD";
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
            AsyncStorage.setItem('user', JSON.stringify(action.payload));
        },
        clearUser(state) {
            state.user = null;
            state.profilePicture = "";
            state.name = "";
            AsyncStorage.removeItem('user');
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
            AsyncStorage.setItem('selectedCurrency', action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserFromFirebase.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                }
            })
            .addCase(loadCurrency.fulfilled, (state, action) => {
                state.selectedCurrency = action.payload;
            });
    }
});

export const { setUser, clearUser, setUserProfile, setCurrency } = userSlice.actions;
export default userSlice.reducer;