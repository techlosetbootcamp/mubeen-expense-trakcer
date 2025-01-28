import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  user: User | null;
  profilePicture: string;
  name: string;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  profilePicture: "",
  name: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    forgotPasswordSuccess(state) {
      state.loading = false;
    },
    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    // setUser(state, action: PayloadAction<User>) {
    //   state.user = action.payload;
    // },
    // clearUser(state) {
    //   state.user = null;
    // },
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
  },
});

export const {
  registerSuccess,
  registerFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearError,
  setUser,
  clearUser,
} = authSlice.actions;

export default authSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserProfile {
//   profilePicture: string;
//   name: string;
// }

// const initialState: UserProfile = {
//   profilePicture: "",
//   name: "",
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUserProfile(state, action: PayloadAction<UserProfile>) {
//       state.profilePicture = action.payload.profilePicture;
//       state.name = action.payload.name;
//     },
//   },
// });

// export const { setUserProfile } = userSlice.actions;
// export default userSlice.reducer;
