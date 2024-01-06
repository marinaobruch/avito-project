import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { userSlice } from '../slice/userSlice';
import { adsSlice } from '../slice/adsSlice';
import { profileSlice } from '../slice/profileSlice';
import { avitoApi } from '../services/ads-service';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  ads: adsSlice.reducer,
  profile: profileSlice.reducer,
  [avitoApi.reducerPath]: avitoApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['avitoApi', 'ads'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(avitoApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;