import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, registerThunk } from '../thunks/auth.thunk';

import { User, getToken, getUser } from '../..';

// initialize userToken from local storage
const accessToken = localStorage.getItem('userToken')
	? localStorage.getItem('userToken')
	: null;

interface AuthState {
	isAuth: boolean;
	success: boolean;
	error: string | null | undefined;
	loading: boolean;
	isExpired: null;
	userData: User | null;
	accessToken: string | null;
}

const initialState: AuthState = (() => {
	const user = getUser();
	const token = getToken();
	let currentTimestamp = Math.floor(Date.now() / 1000);
	const isAuth: boolean =
		user !== null && token !== null && !(currentTimestamp >= user.exp!);

	return {
		isAuth: isAuth,
		success: false,
		error: null,
		loading: false,
		userData: user,
		accessToken: token,
	} as AuthState;
})();

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state) => {
			state.isAuth = true;
		},
		logout: (state) => {
			state.isAuth = false;
			state.userData = null;
		},
	},
	extraReducers: (builder) => {
		/* State manager for register fetch api */

		/* state = pending */
		builder.addCase(registerThunk.pending, (state) => {
			state.loading = true;
		});
		/* state = success */
		builder.addCase(registerThunk.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			state.isAuth = false;
			//Buscar cual es la respuesta de la fase 1 del registro
			state.userData = null /*{
        id: action.payload.user.id as string,
        companyID: action.payload.user.company_id as string,
        accessRole: action.payload.user.access_role as string,
        mfaKey: action.payload.user.mfa_llave as string,

        name: action.payload.user.fname,
        lastName: action.payload.user.lname,

        username: action.payload.user.username,
        password: action.payload.user.password,
        email: action.payload.user.email,
        phone: action.payload.user.phone,
        profile_media: action.payload.user.profile_media,

        country: action.payload.user.pais,
        countryCode: action.payload.user.pais_code,
        companyRole: action.payload.user.role,

        isDisabled: action.payload.user.eliminado,
        createdAt: action.payload.user.creacion,
      }*/;
		});
		/* state =  with errors*/
		builder.addCase(registerThunk.rejected, (state, action) => {
			state.loading = false;
			state.success = false;
			state.error = action.error.message;
		});

		/* State manager for login fetch api */

		/* state = pending */
		builder.addCase(loginThunk.pending, (state) => {
			state.loading = true;
			state.success = false;
			state.isAuth = true;
		});
		/* state = success */
		builder.addCase(loginThunk.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			state.isAuth = true;
			state.userData = action.payload.user as User;
			state.accessToken = action.payload.token as string;
		});
		/* state =  with errors*/
		builder.addCase(loginThunk.rejected, (state, action) => {
			state.loading = false;
			state.success = false;
			state.error = action.payload;
		});
	},
});

export const { login, logout } = authSlice.actions;
