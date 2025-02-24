import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  error: string | null;
}

const initialAuthState: AuthState = {
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    registerSuccess(state) {
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
  },
});

export const { registerSuccess, registerFailure, forgotPasswordSuccess, forgotPasswordFailure, clearError } = authSlice.actions;
export default authSlice.reducer;





// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Income {
//   amount: string;
//   category: string;
//   description: string;
//   attachment: string | null;
//   timestamp: string;
// }

// interface User {
//   uid: string;
//   email: string | null;
//   displayName: string | null;
//   photoURL: string | null;
//   income: Income[];
// }

// interface AuthState {
//   loading: boolean;
//   error: string | null;
//   user: User | null;
//   profilePicture: string;
//   name: string;
// }

// const initialState: AuthState = {
//   loading: false,
//   error: null,
//   user: null,
//   profilePicture: "",
//   name: "",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     registerSuccess(state, action: PayloadAction<User>) {
//       state.user = action.payload;
//       state.loading = false;
//     },
//     registerFailure(state, action: PayloadAction<string>) {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     forgotPasswordSuccess(state) {
//       state.loading = false;
//     },
//     forgotPasswordFailure(state, action: PayloadAction<string>) {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     clearError(state) {
//       state.error = null;
//     },
//     setUser(state, action: PayloadAction<User>) {
//       state.user = action.payload;
//       state.profilePicture = action.payload.photoURL || "";
//       state.name = action.payload.displayName || "";
//     },
//     setIncome(state, action: PayloadAction<Income[]>) {
//       if (state.user) {
//         state.user.income = action.payload;
//       }
//     },
//     clearUser(state) {
//       state.user = null;
//       state.profilePicture = "";
//       state.name = "";
//     },
//     setUserProfile(
//       state,
//       action: PayloadAction<{ profilePicture: string; name: string }>
//     ) {
//       state.profilePicture = action.payload.profilePicture;
//       state.name = action.payload.name;
//     },
//   },
// });

// export const {
//   registerSuccess,
//   registerFailure,
//   forgotPasswordSuccess,
//   forgotPasswordFailure,
//   clearError,
//   setUser,
//   clearUser,
//   setUserProfile,
//   setIncome,
// } = authSlice.actions;

// export default authSlice.reducer;
