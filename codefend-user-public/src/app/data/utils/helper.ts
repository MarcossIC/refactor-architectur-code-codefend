import { User, UserAPI } from '..';

/** Gets token in localStorage */
export const getToken = () => localStorage.getItem('token') ?? '';

/** Set token in localStorage */
export const setToken = (token: string) =>
	window.localStorage.setItem('token', token);

/** persist user data in localStorage */
export const persistUser = (userData: User) =>
	window.localStorage.setItem('user', JSON.stringify(userData));

/** persist user data in localStorage */
export const getUser = (): User | null => {
	const userData = window.localStorage.getItem('user');
	if (userData !== null) return JSON.parse(userData);
	return userData;
};

/** set token and user data for Auth */
export const setAuth = (token: string, user: User) => {
	if (!(token && user)) return;
	setToken(token);
	persistUser(user);
};

/** clear token and user data for Auth */
export const clearAuth = () => {
	window.localStorage.removeItem('token');
	window.localStorage.removeItem('user');
};

/** Date formatter */
export const formatDate = (date?: string | number | Date): string => {
	if (!date || !(date instanceof Date)) return '';

	const formattedDate = new Date(date).toISOString().split('T')[0];
	return formattedDate;
};

/** calculate percentage  */
export const renderPercentage = (value: string, total: string) => {
	if (value === '0') {
		return '0%';
	}
	let percentValue =
		((parseInt(value) / parseInt(total)) * 100).toFixed() + '%';

	return percentValue;
};

/** check if  data is empty/zeros */
export const isEmptyData = (data: any) => {
	if (data.constructor !== Object) return true;

	return Object.values(data).every(
		(item) => Boolean(item) == false || item == 0,
	);
};

export const mapLoginResponseToUser: (response: UserAPI) => User = (
	response: UserAPI,
) => {
	return {
		id: response.id,
		companyID: response.company_id,
		name: response.fname,
		lastName: response.lname,
		username: response.username,
		companyRole: response.role,
		accessRole: response.access_role,
		email: response.email,
		phone: response.phone,
		password: response.password,
		mfaKey: response.mfa_llave,
		profileMedia: response.profile_media,
		companyCountry: response.pais,
		country: response.pais,
		countryCode: response.pais_code,
		isDisabled: response.eliminado,
		createdAt: response.creacion,
	} as User;
};

/* 
{
    "data": {
        "response": "success",
        "message": "Welcome.",
        "session": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiIxMDkiLCJleHAiOjE3MDQ5MjI5MjN9.yP-QpwNGyMrwisNIoI2lDQdwIgFGk7NP9okYXelwZq0",
        "user": {
            "id": "109",
            "company_id": "118",
            "fname": "Marcos",
            "lname": "Lopez",
            "username": "marcosIC",
            "role": "Web Developers",
            "access_role": "user",
            "email": "lopezikaro16@gmail.com",
            "phone": "3757588790",
            "password": "ad2671d23541251a1ecf8a06d2f8f386b8cfd07e62007349d20920fb6c50413f",
            "mfa_llave": "disabled",
            "profile_media": "",
            "pais": "Argentina",
            "pais_code": "AR",
            "pais_provincia": "Buenos Aires",
            "pais_ciudad": "Florentino Ameghino",
            "eliminado": "0",
            "creacion": "2023-12-28 19:34:38"
        }
    }
}
*/
