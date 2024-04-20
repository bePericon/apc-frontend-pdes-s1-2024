import React, { SyntheticEvent } from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hiddenSnackbar } from "@/redux/slice/snackbarSlice";

const SnackbarAlert = () => {
  const snackbar = useSelector((state: any) => state.snackbar);
  const dispatch = useDispatch();

  const handleOnClose = (
    event?: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hiddenSnackbar());
  };

  return (
    <Snackbar
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={snackbar.isActive}
      onClose={handleOnClose}
    >
      <Alert
        onClose={handleOnClose}
        severity={snackbar.severity}
        variant="filled"
        elevation={6}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
