import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, registerThunk } from "../thunks/auth.thunk"

// initialize userToken from local storage
const accessToken = localStorage.getItem('userToken')
	? localStorage.getItem('userToken')
	: null

interface AuthState {
	isAuth: boolean,
	success: boolean,
	error: string | null | undefined,
	loading: boolean,
	isExpired: null,
	userData: {
		username: string
		email: string,
		password: string,
		role: string
		name: string,
		companySize: string | number,
		companyRole: string,
		companyWeb: string
		companyCountry: string
	} | null,
	accessToken: string | null
}

const initialState: AuthState = {
	isAuth: false,
	success: false,
	error: null,
	loading: false,
	isExpired: null,
	userData: null,
	accessToken
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state) => {
			state.isAuth = true
		},
		logout: (state) => {
			state.isAuth = false
			state.userData = null
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
			state.userData = {
				username: action.payload.username,
				email: action.payload.email,
				password: action.payload.password,
				role: action.payload.role,
				name: action.payload.name,
				companySize: action.payload.companySize,
				companyRole: action.payload.companyRole,
				companyWeb: action.payload.companyWeb,
				companyCountry: action.payload.companyCountry,
			}
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
		});
		/* state = success */
		builder.addCase(loginThunk.fulfilled, ({ userData }, action) => {
			state.loading = false;
			state.success = true;
			state.isAuth = true
			state.userData = action.payload.user
			state.accessToken = action.payload.token
		});
		/* state =  with errors*/
		builder.addCase(loginThunk.rejected, (state, action) => {
			state.loading = false;
			state.success = false;
			state.error = action.error.message;
		});
	}
})

export const { login, logout } = authSlice.actions
