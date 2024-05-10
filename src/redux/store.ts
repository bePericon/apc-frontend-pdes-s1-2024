import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import snackbarSlice from "./slice/snackbarSlice";
import loaderSlice from "./slice/loaderSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    snackbar: snackbarSlice,
    loader: loaderSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
