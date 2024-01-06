import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['session'] // aca es donde se le pasa los nombres de los token que van al localstorage en modo persistente
}

export const store = configureStore({
  reducer: {
    authReducer: persistReducer<ReturnType<typeof authSlice.reducer>>(
      persistAuthConfig,
      authSlice.reducer
    )
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export default store
