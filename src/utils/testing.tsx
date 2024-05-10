import React, { PropsWithChildren } from "react";
import { render as rtlRender } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "../redux/store";
import { theme } from "@/styles/theme";
import { DefaultTheme, ThemeProvider } from "styled-components";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

// Wait for the promises to finish
const flushPromises = () => new Promise(process.nextTick);

function render(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <ThemeProvider theme={theme as DefaultTheme}>{children}</ThemeProvider>
    </Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export * from "@testing-library/react";
export { render, flushPromises };
