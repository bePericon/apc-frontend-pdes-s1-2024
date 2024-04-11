import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import snackbarSlice from "./slice/snackbarSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    snackbar: snackbarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
