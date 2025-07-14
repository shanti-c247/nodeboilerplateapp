import type { Document, Types } from 'mongoose';

interface ITwoFactorMethod {
  [key: string]: string;
}
export interface IUser extends Document {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  countryCode: string;
  role: number;
  status: number;
  googleId?: string;
  facebookId?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  generateResetToken: () => string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
  isDeleted: boolean;
  twoFAOtp: string;
  isTwoAuthEnabled: boolean;
  appToken: IAppSecret;
  createdAt: Date;
  updatedAt: Date;
  preferredTwoFAMethods?: ITwoFactorMethod[];
  recoveryCodes: IRecoveryCode[];
  [key: string]: any;
}

export interface UnifiedUserServiceResponse {
  status: number;
  success: boolean;
  message: string;
  data: any | null;
}

export interface SetPasswordTokenResult {
  token: string;
  hashedToken: string;
  expireDate: Date;
}

export interface IAppSecret {
  ascii: string;
  hex: string;
  base32: string;
  otpauth_url: string;
}

export interface IRecoveryCode {
  code: string; // The hashed recovery code
  used: boolean; // Indicates if the code has been used
}
