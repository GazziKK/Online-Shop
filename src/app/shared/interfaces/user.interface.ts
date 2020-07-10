export interface User{
  email: string;
  password: string;
  returnSecureToken?: boolean;
}
export interface FbAuthRespons {
  idToken: string;
  expiresIn: string;
}
