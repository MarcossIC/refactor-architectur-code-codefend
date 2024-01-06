import { decodePayload } from './decodedToken';
import { logout } from '../redux/slices/auth.slice';
import { clearAuth } from '../utils/helper';
import { fetchPOST } from './fetchAPI';
import { LoginParams, LoginResponse, User, mapLoginResponseToUser } from '..';
import { useAuthState } from '../hooks/useAuthState';
const API_URL = 'http://localhost:8000/users/';

const register = async (registerParams: any) => {
	const { data } = await fetchPOST({
		params: {
			model: 'users/access',
			lead_fname: registerParams.name,
			lead_lname: registerParams.lastName,
			lead_role: registerParams.companyRole,
			lead_email: registerParams.email,
			lead_phone: registerParams.phone,
			company_name: registerParams.companyName,
			company_web: registerParams.companyWeb,
			company_size: registerParams.companySize,
			company_area: registerParams.companyCountry,
			phase: '1',
		},
	});

	return data;
};

const login = async (loginParams: LoginParams): Promise<LoginResponse> => {
	const { data } = await fetchPOST({
		params: {
			model: 'users/access',
			provided_email: loginParams.email,
			provided_password: loginParams.password,
		},
	});

	const token = data.session as string;
	const response = data.response as string;
	let user = {} as User;
	if (token || response !== 'success') {
		const decodedToken = decodePayload(token);
		user = {
			...mapLoginResponseToUser(data.user),
			exp: decodedToken.exp ?? 0,
		};
	}

	return { user, token, response };
};

const logout2 = async () => {
	clearAuth();
	logout();
};

const verifyAuth: () => boolean = () => {
	const { getUserdata, isAuth } = useAuthState();

	return !getUserdata() || !isAuth();
};

const AuthServices = {
	register,
	login,
	logout2,
	verifyAuth,
};

export default AuthServices;
