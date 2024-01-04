// Interface para la propiedad 'user'
export interface User {
	id: string;
	company_id: string;
	fname: string;
	access_role: string;
	creacion: string;
	eliminado: string;
	email: string;
	lname: string;
	mfa_llave: string;
	pais: string;
	pais_ciudad: string;
	pais_code: string;
	pais_provincia: string;
	password: string;
	phone: string;
	profile_media: string;
	role: string;
	username: string;
}

// Interface para 'RegistrationData'
export interface RegistrationData {
	response: "success";
	message: string;
	session: string;
	user: User;
}

