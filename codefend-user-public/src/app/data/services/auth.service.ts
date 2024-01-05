import axios from "axios";
import { decodePayload } from "./decodedToken";
import { logout } from "../redux/slices/auth.slice";
import { setAuth, clearAuth } from "../utils/helper";
import { fetchPOST } from "./fetchAPI";
import { RegisterParams, UserAPI } from "..";
const API_URL = "http://localhost:8000/users/";

const register = async (registerParams: RegisterParams) => {
  const { data } = await fetchPOST({
    params: {
      model: "users/access",
      lead_fname: registerParams.name,
      lead_lname: registerParams.lastName,
      lead_role: registerParams.companyRole,
      lead_email: registerParams.email,
      lead_phone: registerParams.phone,
      company_name: registerParams.companyName,
      company_web: registerParams.companyWeb,
      company_size: registerParams.companySize,
      company_area: registerParams.companyCountry,
      phase: "1",
    },
  });

  return data;
};

const login = async (loginParams: any) => {
  const { data } = await fetchPOST({
    params: {
      model: "users/access",
      provided_email: loginParams.email,
      provided_password: loginParams.password,
    },
  });

  const token = data.session as string;
  if (token) {
    const decodedToken = decodePayload(token);
    const userData = { ...data.user, exp: decodedToken.exp ?? 0 };

    setAuth(token, userData);
    console.log("here in singin now here");
  }

  console.log("real login", { data });

  return data;
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
