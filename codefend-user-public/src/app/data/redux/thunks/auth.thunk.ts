import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthServices from '../../services/auth.service';
import { User, UserAPI } from '../..';

export interface LoginParams {
	email: string;
	password: string;
}

//paso 1
export interface RegisterParams {
	lead_fname: string;
	lead_lname?: string;
	lead_role: string | number;
	lead_email: string;
	lead_phone?: string;
	company_name: string;
	company_web: string;
	company_size: string | number;
	company_area: string;
	phase: string;
}

// Tipo de retorno de la función de inicio de sesión
export interface LoginResponse {
	user: User;
	token: string;
	response: string;
}

// Tipo de retorno de la función de registro
export interface RegisterResponse {
	_id: string;
	username: string;
	email: string;
	password: string;
	role: string;
	name: string;
	companySize: string;
	companyRole: string;
	companyWeb: string;
	companyCountry: string;
}

export const loginThunk = createAsyncThunk<
	LoginResponse,
	LoginParams,
	{ rejectValue: string }
>('auth/login', async (loginParams: LoginParams, { rejectWithValue }) => {
	try {
		const { user, token, response } = await AuthServices.login(loginParams);
		if (response !== 'success') {
			throw new Error('An error occurred with the credentials');
		}
		return { user, token, response };
	} catch (error) {
		return rejectWithValue(error as string);
	}
});

export const registerThunk = createAsyncThunk<
	RegisterResponse,
	RegisterParams,
	{ rejectValue: string }
>(
	'auth/register',
	async (registroParams: RegisterParams, { rejectWithValue }) => {
		try {
			const response = await AuthServices.register(registroParams);
			// Realiza una conversión explícita del tipo AxiosResponse al tipo RegisterResponse
			const registerResponse: RegisterResponse = response.data;
			return registerResponse;
		} catch (error) {
			return rejectWithValue(error as string);
		}
	},
);
