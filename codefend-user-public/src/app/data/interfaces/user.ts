// Interface para la propiedad 'user'
export interface User {
    id: string;
    companyID: string;
    accessRole: string;
    mfaKey: string;
  
    name: string;
    lastName: string;
  
    username?: string;
    password?: string;
    email: string;
    phone: number | string;
    profile_media: string;
  
    country?: string;
    countryCode: string;
  
    companySize?: string | number;
    companyName?: string;
    companyRole: string;
    companyWeb?: string;
    companyCountry?: string;
  
    isDisabled: boolean;
    createdAt: string;
    exp?: number;
  }
  
  export interface UserAPI {
    id: string;
    company_id: string;
    fname: string;
    lname: string;
    username: string;
    role: string;
    access_role: string;
    email: string;
    phone: string;
    password: string;
    mfa_llave: string;
    profile_media: string;
    pais: string;
    pais_code: string;
    pais_provincia: string;
    pais_ciudad: string;
    eliminado: boolean;
    creacion: string;
    exp?: number;
  }
  
  export type UserStore = Omit<User, "id" | "phone" | "companyName" | "exp">;
  
  export type UserRegister = Omit<
    User,
    | "id"
    | "companyID"
    | "mfaKey"
    | "accessRole"
    | "isDisabled"
    | "createdAt"
    | "profile_media"
    | "countryCode"
    | "country"
    | "exp"
  > & { phase: string };
  
  export type UserLogin = Omit<
    User,
    | "id"
    | "password"
    | "name"
    | "phone"
    | "companySize"
    | "companyName"
    | "companyRole"
    | "companyWeb"
    | "companyCountry"
    | "exp"
  >;
  
  // Interface para 'RegistrationData'
  export interface RegistrationData {
    response: "success";
    message: string;
    session: string;
    user: UserAPI;
  }