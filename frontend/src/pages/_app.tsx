import SnackbarAlert from "@/components/common/SnackbarAlert";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { theme } from "@/styles/theme";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { DefaultTheme, ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme as DefaultTheme}>
        <Component {...pageProps} />
        <SnackbarAlert />
      </ThemeProvider>
    </Provider>
  );
}
