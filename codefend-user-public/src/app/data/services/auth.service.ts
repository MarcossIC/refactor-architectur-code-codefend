import axios from "axios";
import { logout } from "../redux/slices/auth.slice";
import { setAuth, clearAuth } from "../utils/helper";

const API_URL = "http://localhost:8000/users/";




const register = (registroParams: any) => { //no dejar esto asi!
  return axios.post(API_URL + "register", registroParams, {
    headers: { "Content-Type": "application/json" },
  });
};

const login = async (loginParams: any) => { //no dejar esto asi
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
