import {
	configureStore,
	Middleware,
	MiddlewareAPI,
	Dispatch,
	Action,
} from '@reduxjs/toolkit';
import { authSlice } from './slices';
import { setAuth } from '..';

const persistenceMiddleware: any =
	(store: MiddlewareAPI) =>
	<A extends Action>(next: Dispatch<A>) =>
	(action: A): void => {
		next(action);
		const { userData, accessToken } = store.getState().authState;
		setAuth(accessToken, userData);
	};

//Se definen los nombres de los reducers
const rootReducer = {
	authState: authSlice.reducer,
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).prepend(
			persistenceMiddleware,
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//export const persistor = persistStore(store);
export default store;
