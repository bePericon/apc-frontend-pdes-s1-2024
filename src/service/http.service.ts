import { showSnackbar } from "@/redux/slice/snackbarSlice";
import { store } from "@/redux/store";
import axios, { AxiosInstance } from "axios";

export abstract class HTTPService {
  protected instance: AxiosInstance;
  protected readonly baseURL: string;
  protected readonly withToken: boolean;

  public constructor(baseURL: string, withToken: boolean = true) {
    this.baseURL = baseURL;
    this.withToken = withToken;
    this.instance = axios.create({
      baseURL,
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((request) => {
      if (this.withToken) {
        const token = store.getState().auth.token;
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    });
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use((response) => {
      return response;
    }, this.handleError);
  };

  private handleError = async (error: any) => {
    if (error.message === "Network Error" && !error.response) {
      store.dispatch(
        showSnackbar({
          message: "Ha ocurrido un error de conexión.",
          severity: "error",
        })
      );
    } else {
      const response = error?.response;
      store.dispatch(showSnackbar({ message: response?.data.status, severity: "error" }));
    }

    return Promise.reject(error);
  };

  // private handleError(catchError: any, method: string) {
  //   const error = new Error(
  //     catchError?.response?.data?.message ||
  //       catchError?.message ||
  //       "Ha ocurrido un error inesperado."
  //   );

  //   const errorCode =
  //     catchError.cause?.status || catchError.response?.status || 500;

  //   console.log(
  //     `CMS Service: Error ${errorCode} - ${error.message} occurred while executing ${method}`
  //   );

  //   return {
  //     data: [],
  //     error: {
  //       code: errorCode,
  //       message: error.message,
  //     },
  //   };
  // }
}
