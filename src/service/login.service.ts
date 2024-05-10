import { LoginData } from "@/types/login.types";
import { HTTPService } from "./http.service";
import { store } from "@/redux/store";
import { showSnackbar } from "@/redux/slice/snackbarSlice";

class LoginService extends HTTPService {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_URL_BASE as string);
  }

  public async signIn(loginData: LoginData): Promise<void> {
    try {
      const loginUserData = await this.instance.post(
        `${process.env.NEXT_PUBLIC_API_URL_BASE}/auth/login`,
        loginData, { withCredentials: true }
      );

      const { status, data } = loginUserData.data;
      const {password, ...cleanedUser} = data;

      store.dispatch(showSnackbar({ message: status, severity: "success" }));

      localStorage.setItem("loginUserData", JSON.stringify(cleanedUser));
    } catch (err: any) {
      // console.log("🚀 ~ LoginService ~ login ~ err:", err);
    }
  }

  public logout(): void {
    localStorage.removeItem("loginUserData");
  }
}

const instance = new LoginService();
export default instance;
