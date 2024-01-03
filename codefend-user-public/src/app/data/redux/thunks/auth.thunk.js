import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "../../../services/auth.service";

export const loginThunk = createAsyncThunk('auth/login', async (loginParams) => {
	try {
		const { user, token } = await AuthServices.login(loginParams)
		console.log(user, token )
		return { user: user, token: token }
	} catch (error) {
		throw error;
	}
});


export const registerThunk = createAsyncThunk('auth/register', async (registroParams) => {
	try {
		const response = AuthServices.register(registroParams)
		const data = response
		console.log(data)
		return data
	} catch (error) {
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();
		return rejectWithValue(message);
	}
});