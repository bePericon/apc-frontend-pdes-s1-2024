import { showSnackbar } from "@/redux/slice/snackbarSlice";
import { store } from "@/redux/store";
import axios, { AxiosError, AxiosInstance } from "axios";

export abstract class HTTPService {
  protected instance: AxiosInstance;
  protected readonly baseURL: string;

  public constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((request) => {
      return request;
    });
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use((response) => {
      return response;
    }, this.handleError);
  };

  private handleError = async (error: AxiosError) => {
    const e = { ...error }
    console.log("🚀 ~ HTTPService ~ handleError= ~ error:", e.code)
    if (error.message === "Network Error" && !error.response) {
      store.dispatch(
        showSnackbar({
          message: "Ha ocurrido un error de conexión.",
          severity: "error",
        })
      );
    } else {
      const { data } = error?.response;
      store.dispatch(
        showSnackbar({ message: data.status, severity: "error" })
      );
    }

    return Promise.reject(error);
  };
}
