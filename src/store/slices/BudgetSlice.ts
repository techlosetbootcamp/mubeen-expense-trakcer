import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { database, auth } from "../../config/firebaseConfig";
import { ref, get, set } from "firebase/database";

export interface Notification {
  message: string;
  timestamp: string;
  isSeen: boolean;
  budgetId: string;
}

interface BudgetState {
  notifications: Notification[];
  notifiedBudgetIds: string[];
}

const initialState: BudgetState = {
  notifications: [],
  notifiedBudgetIds: [],
};

export const fetchNotifications = createAsyncThunk(
  "budget/fetchNotifications",
  async () => {
    const user = auth.currentUser;
    if (!user) return { notifications: [], notifiedBudgetIds: [] };

    const notificationsRef = ref(database, `users/${user?.uid}/notifications`);
    const snapshot = await get(notificationsRef);
    if (snapshot?.exists()) {
      const data = snapshot?.val();
      const notifications = Object?.keys(data)?.map((key) => ({
        ...data[key],
        budgetId: data[key]?.budgetId || "",
        isSeen: data[key]?.isSeen !== undefined ? data[key]?.isSeen : false,
      }));
      const notifiedBudgetIds = notifications?.map((n) => n.budgetId)?.filter(Boolean);
      return { notifications, notifiedBudgetIds };
    }
    return { notifications: [], notifiedBudgetIds: [] };
  }
);

export const updateNotificationsSeen = createAsyncThunk(
  "budget/updateNotificationsSeen",
  async (_, { getState }) => {
    const user = auth?.currentUser;
    if (!user) return;

    const state = getState() as { budget: BudgetState };
    const notifications = state?.budget?.notifications;

    const notificationsRef = ref(database, `users/${user?.uid}/notifications`);
    const snapshot = await get(notificationsRef);
    if (snapshot.exists()) {
      const data = snapshot?.val();
      const updatedData = Object?.keys(data)?.reduce((acc, key) => {
        acc[key] = {
          ...data[key],
          isSeen: true,
        };
        return acc;
      }, {} as any);
      await set(notificationsRef, updatedData);
    }
  }
);

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      if (!state?.notifiedBudgetIds?.includes(action?.payload?.budgetId)) {
        state?.notifications?.push({ ...action?.payload, isSeen: false });
        state?.notifiedBudgetIds?.push(action?.payload?.budgetId);
      }
    },
    markNotificationsAsSeen(state) {
      state.notifications = state?.notifications?.map((notification) => ({
        ...notification,
        isSeen: true,
      }));
    },
  },
  extraReducers: (builder) => {
    builder?.addCase(fetchNotifications?.fulfilled, (state, action) => {
      state.notifications = action?.payload?.notifications;
      state.notifiedBudgetIds = action?.payload?.notifiedBudgetIds;
    });
  },
});

export const { addNotification, markNotificationsAsSeen } = budgetSlice.actions;
export default budgetSlice.reducer;