import React, { SyntheticEvent, useEffect } from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hiddenSnackbar } from "@/redux/slice/snackbarSlice";

const SnackbarAlert = () => {
  const snackbar = useSelector((state: any) => state.snackbar);
  const dispatch = useDispatch();
  let timeout = setTimeout(function () {
    dispatch(hiddenSnackbar());
  }, 4000000);

  const handleOnClose = (
    event?: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hiddenSnackbar());
  };

  useEffect(() => {
    if (snackbar.isActive) clearTimeout(timeout);
  }, [snackbar.isActive]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={snackbar.isActive}
      onClose={handleOnClose}
    >
      <Alert
        onClose={handleOnClose}
        severity={snackbar.severity}
        variant="filled"
        elevation={6}
        id="text-alert"
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
