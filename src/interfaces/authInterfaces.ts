export interface ChangeData {
  password: string;
  password_new: string;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}
export interface ForgetPassData {
  email: string;
}
export interface ResetData {
  email: string;
  password: string;
  otp: string;
}
export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
export interface AuthResponse {
  token: string;
  user: User;
}
