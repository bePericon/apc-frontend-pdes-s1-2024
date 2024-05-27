import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import snackbarSlice from './slice/snackbarSlice'
import loaderSlice from './slice/loaderSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
    auth: authSlice,
    snackbar: snackbarSlice,
    loader: loaderSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer,
        preloadedState,
    })
}
export type AppStore = ReturnType<typeof setupStore>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
