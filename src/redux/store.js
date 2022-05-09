import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import { persistStore, persistReducer, PERSIST } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, productReducer)

export const store = configureStore({
  reducer: {
    productReducer: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [ PERSIST,],
    },
  }),
})

export const persistor = persistStore(store)