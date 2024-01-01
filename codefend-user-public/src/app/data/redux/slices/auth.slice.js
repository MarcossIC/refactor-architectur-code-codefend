import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerthunk } from "../thunks/auth.thunk";

// initialize userToken from local storage
const accessToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  isAuth: false,
  success: false,
  error: null,
  loading: false,
  isExpired: null,
  userData: {},
  accessToken,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerthunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerthunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.accessToken = action.payload.session;
      state.isAuth = true;
      state.userData = action.payload.user;
    });
    builder.addCase(registerthunk.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
  },
});

export const { login, logout } = authSlice.actions;
