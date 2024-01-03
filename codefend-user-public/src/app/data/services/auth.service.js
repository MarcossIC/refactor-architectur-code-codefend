import axios from "axios";
import { setAuth, clearAuth } from "../utils/helper";
import { logout } from "../redux/slices/auth.slice";

const API_URL = "http://localhost:8000/users/";

const register = (registroParams) => {
  return axios.post(API_URL + "register", registroParams, {
    headers: { "Content-Type": "application/json" },
  });
};

const login = async (loginParams) => {
  const response = await axios.post(API_URL + "login", loginParams);
  const { token, user } = response.data;
  if (token) {
    setAuth(token, user);
  }
  return response.data;
};

const logout2 = async () => {
  clearAuth();
  logout();
};

const AuthServices = {
  register,
  login,
  logout2,
};

export default AuthServices;
