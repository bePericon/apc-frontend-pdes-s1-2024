import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import snackbarSlice from "./slice/snackbarSlice";
import loaderSlice from "./slice/loaderSlice";

const reducer = {
  auth: authSlice,
  snackbar: snackbarSlice,
  loader: loaderSlice,
};

export const store = configureStore({
  reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer,
    preloadedState,
  });
};
export type AppStore = ReturnType<typeof setupStore>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
