import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
		await axios.post('/v1/auth/signup', registroParams, {
			headers: { 'Content-Type': 'application/json' },
		});
		return true;
	} catch (error) {
		throw error;
	}
});