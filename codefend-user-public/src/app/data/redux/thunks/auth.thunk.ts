import {  createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "../../services/auth.service";

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  name: string;
  username: string;
  email: string;
  phone: number;
  companyName: string;
  companySize: string | number;
  companyRole: string;
  companyWeb: string;
  companyCountry: string;
  password: string;
  role: string;
}

// Tipo de retorno de la función de inicio de sesión
export interface LoginResponse {
  user: {
    email: string;
    username: string;
    role: string;
  };
  token: string;
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

export const loginThunk = createAsyncThunk<LoginResponse, LoginParams, { rejectValue: string }>(
  'auth/login',
  async (loginParams: LoginParams, { rejectWithValue }) => {
    try {
      const { user, token } = await AuthServices.login(loginParams);
      console.log(user, token);
      return { user, token } as LoginResponse;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const registerThunk = createAsyncThunk<RegisterResponse, RegisterParams, { rejectValue: string }>(
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
  }
);
