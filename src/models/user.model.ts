// src/models/userModel.ts
import mongoose, { type Model, Schema } from 'mongoose';

//Config
import { defaultRole, roles } from '@config/index';

//Constants
import { commonVariables } from '@constants';

//enums
import { TwoFactorMethod, UserStatus } from '@enums';

//Custom types
import type { IRecoveryCode, IUser } from '@customTypes';

// manage token object in db
const addressSchema = new Schema(
  {
    ascii: String,
    hex: String,
    base32: String,
    otpauth_url: String,
  },
  { _id: false },
);

const recoveryCodeSchema = new Schema<IRecoveryCode>({
  code: { type: String, required: true },
  used: { type: Boolean, default: false },
});

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: Number,
      enum: roles,
      default: defaultRole,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    countryCode: {
      type: String,
      default: null,
    },
    status: {
      type: Number,
      default: UserStatus.Inactive,
    },
    googleId: String,
    facebookId: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    twoFAOtp: {
      type: String,
      default: null,
    },
    isTwoAuthEnabled: {
      type: Boolean,
      default: false,
    },
    appToken: addressSchema,
    preferredTwoFAMethods: {
      type: [{ methodType: { type: String, enum: Object.values(TwoFactorMethod) } }],
      default: [{ methodType: TwoFactorMethod.NONE }], // Default to 'none' if no method is selected
    },
    recoveryCodes: { type: [recoveryCodeSchema], default: [] },
  },
  {
    timestamps: true,
  },
);

// Customize JSON transformation to exclude sensitive data
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id; // Add id
    commonVariables.USER_SENSITIVE_INFO_DB_COLUMNS.forEach((field) => delete ret[field]);
    return ret;
  },
});

export const User: Model<IUser> = mongoose.model<IUser>('users', userSchema);

// Function to format the user document
export const modelToDomain = (userDoc: IUser) => {
  const formattedDoc = {
    id: userDoc.id.toString(),
    email: userDoc.email,
    name: userDoc.name,
    role: userDoc.role,
    status: userDoc.status === null ? undefined : userDoc.status,
    isDeleted: userDoc.isDeleted === null ? undefined : userDoc.isDeleted,
    isTwoAuthEnabled: userDoc.isTwoAuthEnabled === null ? undefined : userDoc.isTwoAuthEnabled,
    createdAt: userDoc.createdAt === null ? undefined : userDoc.createdAt,
    updatedAt: userDoc.updatedAt === null ? undefined : userDoc.updatedAt,
  };
  // Optionally, you can also sanitize any nested objects or arrays if needed
  return formattedDoc;
};
