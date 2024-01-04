import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "../../services/auth.service";


export const loginThunk = createAsyncThunk(
  "auth/login",
  async (loginParams, {rejectWithValue}) => {
    try {
      const { user, token } = await AuthServices.login(loginParams);
      console.log(user, token);
      return { user: user, token: token };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (registroParams, {rejectWithValue}) => {
    try {
      const response = AuthServices.register(registroParams);
      const data = response;
      console.log(data);
      return data;
    } catch (error) {
        return rejectWithValue(error)
    }
  }
);
