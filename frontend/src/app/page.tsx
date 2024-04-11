"use client";
import Login from "@/components/pages/Login/Login";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import SnackbarAlert from "@/components/common/SnackbarAlert";

export default function LoginPage() {
  return (
    <Provider store={store}>
      <SnackbarAlert />
      <Login />
    </Provider>
  );
}