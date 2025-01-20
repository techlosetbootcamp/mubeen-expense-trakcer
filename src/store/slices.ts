import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  profilePicture: string;
  name: string;
}

const initialState: UserProfile = {
  profilePicture: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile(state, action: PayloadAction<UserProfile>) {
      state.profilePicture = action.payload.profilePicture;
      state.name = action.payload.name;
    },
  },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;
