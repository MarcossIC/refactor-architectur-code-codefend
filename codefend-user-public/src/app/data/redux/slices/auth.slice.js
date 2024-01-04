import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, registerThunk } from "../thunks/auth.thunk"

// initialize userToken from local storage
const accessToken = localStorage.getItem('userToken')
	? localStorage.getItem('userToken')
	: null

const initialState = {
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
				_id: action.payload.data._id,
				username: action.payload.data.username,
				email: action.payload.data.email,
				password: action.payload.data.password,
				role: action.payload.data.role,
				name: action.payload.data.name,
				companySize: action.payload.data.companySize,
				companyRole: action.payload.data.companyRole,
				companyWeb: action.payload.data.companyWeb,
				companyCountry: action.payload.data.companyCountry,
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
		builder.addCase(loginThunk.fulfilled, (state, action) => {
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
