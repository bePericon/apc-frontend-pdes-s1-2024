import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: any;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutSuccess: (state) => {
      state.user = initialState.user;
      state.token = initialState.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutSuccess} = authSlice.actions;

export default authSlice.reducer;
