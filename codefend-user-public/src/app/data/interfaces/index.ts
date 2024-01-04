// Interface para la propiedad 'user'
export interface User {
  id?: string;
  username?: string;
  email: string;
  password?: string;
  role?: string;
  name: string;
  phone?: number;
  companySize: string | number;
  companyName?: string;
  companyRole: string;
  companyWeb: string;
  companyCountry: string;
}
/* 

*/

export type UserStore = Omit<User, "id" | "phone" | "companyName">;
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
>;

// Interface para 'RegistrationData'
export interface RegistrationData {
  response: "success";
  message: string;
  session: string;
  user: User;
}
