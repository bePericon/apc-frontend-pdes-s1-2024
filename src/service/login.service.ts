import { LoginData, SignUpData } from "@/types/login.types";
import { HTTPService } from "./http.service";
import { store } from "@/redux/store";
import { showSnackbar } from "@/redux/slice/snackbarSlice";
import { loginSuccess, logoutSuccess } from "@/redux/slice/authSlice";
import { User } from "@/types/apc.types";

class LoginService extends HTTPService {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_URL_BASE as string, false);
  }

  public async signIn(loginData: LoginData): Promise<string> {
    try {
      const loginUserData = await this.instance.post(
        `${process.env.NEXT_PUBLIC_API_URL_BASE}/auth/login`,
        loginData,
        { withCredentials: true }
      );

      const { status, data } = loginUserData.data;

      store.dispatch(showSnackbar({ message: status, severity: "success" }));
      store.dispatch(loginSuccess(data));

      return data.token;
    } catch (err: any) {
      // console.log("🚀 ~ LoginService ~ login ~ err:", err);
    }
    return "";
  }

  public logout(): void {
    store.dispatch(logoutSuccess());
  }

  public async signUp(signUpData: SignUpData): Promise<User> {
    try {
      const userData = await this.instance.post(
        `${process.env.NEXT_PUBLIC_API_URL_BASE}/auth/signup`,
        signUpData,
        { withCredentials: true }
      );

      const { status, data } = userData.data;

      store.dispatch(showSnackbar({ message: status, severity: "success" }));

      return data;
    } catch (err: any) {
      // console.log("🚀 ~ LoginService ~ login ~ err:", err);
    }
    return {} as User;
  }
}

const instance = new LoginService();
export default instance;
