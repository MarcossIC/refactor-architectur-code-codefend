import { LoginParams, LoginResponse, User, mapLoginResponseToUser } from '..';
import { useAuthState } from '../hooks/useAuthState';
import { logout } from '../redux/slices/auth.slice';
import { clearAuth } from '../utils/helper';
import { decodePayload } from './decodedToken';
import { fetchPOST } from './fetchAPI';

export interface RegisterFinishParams {
	username: string;
	password: string;
	lead_reference_number: string | undefined;
}

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

const registerFinish = async ({
	username,
	password,
	lead_reference_number,
}: RegisterFinishParams): Promise<any> => { //falta agregar tipo a la respuesta del back
	const { data } = await fetchPOST({
		params: {
			model: 'users/new',
			username: username,
			password: password,
			lead_reference_number: lead_reference_number
		},
	});

	return data
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
	registerFinish,
	login,
	logout2,
	verifyAuth,
};

export default AuthServices;
