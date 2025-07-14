export interface IRegisterBody {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string; // Optional field
  countryCode?: string; // Optional field
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IUpdateProfile {
  name: string;
  email: string;
  phoneNumber?: string; // Optional field
  countryCode?: string; // Optional field
}

export interface IForgetPasswordBody {
  email: string;
}

export interface IResetPasswordBody {
  token: string;
  password: string;
}

export interface IChangePasswordBody {
  currentPassword: string;
  newPassword: string;
}
