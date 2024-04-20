import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoaderState {
  isActive: boolean;
}

const initialState: LoaderState = {
  isActive: false
};

export const LoaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { showLoader } = LoaderSlice.actions;

export default LoaderSlice.reducer;
