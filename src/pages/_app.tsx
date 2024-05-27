import Loader from '@/components/common/Loader'
import SnackbarAlert from '@/components/common/SnackbarAlert'
import { persistor, store } from '@/redux/store'
import '@/styles/globals.css'
import { theme } from '@/styles/theme'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { DefaultTheme, ThemeProvider } from 'styled-components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <ThemeProvider theme={theme as DefaultTheme}>
          <Component {...pageProps} />
          <SnackbarAlert />
          <Loader />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
