// Interface para la propiedad 'user'
export interface User {
	id?: string;
	username?: string
	email: string,
	password?: string,
	role?: string
	name: string,
	phone?: number,
	companySize: string | number,
	companyName?: string,
	companyRole: string,
	companyWeb: string
	companyCountry: string
}

// Interface para 'RegistrationData'
export interface RegistrationData {
	response: "success";
	message: string;
	session: string;
	user: User;
}

