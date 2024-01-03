import axios from "axios";

const API_URL = "http://localhost:8000/users/";

const register = (registroParams) => {
	return axios.post(API_URL + "register", registroParams, {
		headers: { 'Content-Type': 'application/json' },
	});
};

const login = async (username, password) => {
	const response = await axios
		.post(API_URL + "login", {
			username,
			password,
		});
	if (response.data.username) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

/* const logout = async () => {
	localStorage.removeItem("user");
	const response = await axios.post(API_URL + "signout");
	return response.data;
}; */

const AuthServices = {
	register,
	login
}

export default AuthServices;