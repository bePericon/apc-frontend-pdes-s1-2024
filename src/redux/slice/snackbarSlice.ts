import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SnackbarPayload {
  message: string;
  severity: AlertColor;
}

export interface SnackbarState {
  isActive: boolean;
  message: string;
  severity: AlertColor;
}

const initialState: SnackbarState = {
  isActive: false,
  message: "Hubo un problema...",
  severity: "error",
};

export const SnackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<SnackbarPayload>) => {
      state.isActive = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hiddenSnackbar: (state) => {
      state.isActive = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showSnackbar, hiddenSnackbar } = SnackbarSlice.actions;

export default SnackbarSlice.reducer;
