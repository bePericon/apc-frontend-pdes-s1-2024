import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useLoading } from "@/hook/UseLoading";
import { showSnackbar } from "@/redux/slice/snackbarSlice";

const InterceptorAxios = () => {
  const { isActive, setLoadingOn, setLoadingOff } = useLoading();
//   const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const requestHandler = (request: any) => {
    setLoadingOn();

    //Check user is logged for add token in request
    // if (auth.isLoggedIn) {
    //   request.headers.Authorization = `Bearer ${auth.token}`;
    // }

    return request;
  };

  const responseHandler = (response: any) => {
    setLoadingOff();
    return response;
  };

  const errorHandler = (error: any) => {
    console.log("🚀 ~ errorHandler ~ error:", error)
    setLoadingOff();
    // if (error.message === "Network Error" && !error.response) {
    //   dispatch(
    //     showSnackbar({
    //       message: "Ha ocurrido un error de conexión.",
    //       severity: "error",
    //     })
    //   );
    // } else {
    //   const { data } = error?.response;
    //   dispatch(
    //     showSnackbar({ message: data.error.message, severity: "error" })
    //   );
    // }

    return Promise.reject(error);
  };

  useEffect(() => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL_BASE;

    axios.interceptors.request.use((request) => requestHandler(request));
    axios.interceptors.response.use(
      (response) => responseHandler(response),
      (error) => errorHandler(error)
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Loader isActive={isActive} />;
};

export default InterceptorAxios;
