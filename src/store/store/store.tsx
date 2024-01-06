import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { avitoApi } from '../services/ads-service'
import { adsSlice } from '../slice/adsSlice'
import { profileSlice } from '../slice/profileSlice'
import { userSlice } from '../slice/userSlice'

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

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(avitoApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
