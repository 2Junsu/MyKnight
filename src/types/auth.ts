export interface LoginInfo {
  email: string;
  password: string;
}

export interface SignupInfo extends LoginInfo {
  passwordCheck: string;
  nickname: string;
}
