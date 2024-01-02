import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AuthServices from "../../../services/auth.service";

export const loginThunk = createAsyncThunk('auth/login', async (credencialesLogin) => {
	try {
		const response = await axios.post('/v1/auth/signin', credencialesLogin, {
			headers: { 'Content-Type': 'application/json' },
		});

		const { token } = response.data;

		localStorage.setItem('token', token);

		return jwt_decode(token);
	} catch (error) {
		throw error;
	}
});


export const registerthunk = createAsyncThunk('auth/register', async (registroParams) => {
	try {
		const response = AuthServices.register(registroParams)
		const data =  response
		console.log(data)
		return data
	} catch (error) {
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();
		return rejectWithValue(error);
	}
});