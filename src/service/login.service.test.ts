import { waitFor } from "@/utils/testing";
import LoginService from "./login.service";
import { store } from "@/redux/store";
import { loginSuccess } from "@/redux/slice/authSlice";

const loginService = LoginService;

describe("Login Service", () => {
  const loginUserData = {
    token: "G226066L120288262ss223s.231!wsd883mis09",
    user: {},
  };
  describe("signIn", () => {
    const loginData = {
      email: "email@email.com",
      password: "12345678",
    };

    it("should getting correct user login data", async () => {
      loginService["instance"].post = jest.fn().mockResolvedValueOnce({
        data: {
          status: 200,
          data: loginUserData,
        },
      });
      const response = await loginService.signIn(loginData);

      expect(response).toBe(loginUserData.token);
    });
  });

  describe("logout", () => {
    it("should store correctly data", () => {
      store.dispatch(loginSuccess(loginUserData));

      waitFor(() => {
        loginService.logout();
      });

      const updatedStore = store.getState();
      expect(updatedStore.auth.token).toBe("");
      expect(updatedStore.auth.user).toBeNull();
    });
  });

  describe("signUp", () => {
    it("should getting correct user login data", async () => {
      const signupData = {
        name: "Username",
        email: "email@email.com",
        password: "12345678",
      };

      const user = {
        _id: "",
        username: "",
        surname: "",
        name: "Username",
        email: "email@email.com",
        password: "12345678",
        roles: [],
        favorites: [],
        creationDate: "",
      };

      loginService["instance"].post = jest.fn().mockResolvedValueOnce({
        data: {
          status: 200,
          data: user,
        },
      });
      const response = await loginService.signUp(signupData);

      expect(response.email).toBe(signupData.email);
    });
  });
});
