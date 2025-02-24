import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
}

const initialUserState: UserState = {
  user: null,
  profilePicture: "",
  name: "",
};

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
  },
});

export const { setUser, clearUser, setUserProfile } = userSlice.actions;
export default userSlice.reducer;