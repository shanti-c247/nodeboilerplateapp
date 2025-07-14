import crypto from 'node:crypto';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
//Third-party modules
import type { Response } from 'express';
import jwt from 'jsonwebtoken';

//Config
import env from '@config/envVar';

import { defaultRole, roles } from '@config/index';
//Constants
import { authVariables, commonVariables } from '@constants';
import { Role, UserStatus } from '@enums';
//Utils
import { commonHandler } from '@utils';

export const clearToken = (res: Response) => {
  res.cookie(env.AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    expires: new Date(0),
  });
};

/**
 * Compares a given password with a hashed password.
 * @param {string} enteredPassword - The password entered by the user
 * @param {string} hashedPassword - The hashed password
 * @returns {Promise<boolean>} - A boolean indicating whether the comparison is successful or not
 */
export const comparePassword = async (enteredPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

/**
 * Generates a verification token for verifying email addresses.
 * @param {object} payload - The payload to be signed in the token
 * @returns {Promise<string>} - The generated token
 */
export const generateVerifyEmailToken = async (payload: object): Promise<string> => {
  const jwtSecret = env.JWT_SECRET;
  const expireIn = await commonHandler.convertTime(
    Number(authVariables.VERIFY_EMAIL_TOKEN_EXPIRE),
    String(authVariables.VERIFY_EMAIL_TOKEN_EXPIRE_UNIT),
    commonVariables.MILLISECOND, //Supported units: year, month, day, hour, minute, second, millisecond.
  );

  const token = jwt.sign(payload, jwtSecret as string, {
    expiresIn: expireIn,
  });
  return token;
};

/**
 * Generates a password reset token.
 * @returns {Promise<{ token: string; hashedToken: string; expireDate: Date; }>} - The generated token and its hashed version, as well as the expiration date.
 */
export const generateResetToken = async (): Promise<{
  token: string;
  hashedToken: string;
  expireDate: Date;
}> => {
  const resetToken = crypto.randomBytes(32).toString('hex');

  const hashedToken = crypto.createHash(`${commonVariables.HASH_METHOD}`).update(resetToken).digest('hex');
  const expireIn = await commonHandler.convertTime(
    Number(authVariables.RESET_TOKEN_EXPIRE),
    String(authVariables.RESET_TOKEN_UNIT),
    commonVariables.MILLISECOND, //Supported units: year, month, day, hour, minute, second, millisecond.
  );
  const expireDate = new Date(Date.now() + expireIn); // Expires based on configured time

  return { token: resetToken, hashedToken, expireDate };
};

/**
 * Hashes a given password using bcrypt.
 * @param {string} password - The password to hash
 * @returns {Promise<string>} - The hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Generates random data for an authentication request based on the provided type.
 * @param {string} type - The type of authentication request to generate data for.
 * @returns {Record<string, unknown>} - The random data for the authentication request.
 * @throws {Error} If the type is not supported.
 */
export const authRandomData = (type: string) => {
  const commonData = {
    name: { type: 'string', example: faker.person.fullName() },
    email: { type: 'string', example: faker.internet.email() },
    phoneNumber: { type: 'string', example: faker.string.numeric(10) },
    countryCode: { type: 'string', example: faker.helpers.arrayElement(['+1', '+44', '+91']) },
    role: {
      type: 'integer',
      example: Role.User,
      enum: [Role.User, Role.Admin],
    },
  };

  const commonStatus = {
    type: 'integer',
    example: UserStatus.Active,
    enum: [UserStatus.Active, UserStatus.Inactive],
  };

  const commonPassword = {
    type: 'string',
    example: faker.internet.password({
      length: commonVariables.PASSWORD_MIN_LENGTH,
    }),
  };

  switch (type) {
    case 'authSchema':
      return {
        ...commonData,
        id: { type: 'string', example: faker.string.uuid() },
        status: commonStatus,
        createdAt: { type: 'string', example: faker.date.past() },
        updatedAt: { type: 'string', example: faker.date.recent() },
        __v: { type: 'integer', example: 0 },
      };

    case 'registerRequest':
      return {
        name: { type: 'string', example: faker.person.fullName() },
        email: { type: 'string', example: faker.internet.email() },
        password: { type: 'string', example: faker.internet.password() },
        phoneNumber: { type: 'string', example: '769386759' },
        countryCode: { type: 'string', example: '+91' },
      };
    case 'verifyRequest':
      return {
        token: { type: 'string', example: faker.internet.jwt() },
      };
    case 'loginRequest':
      return {
        email: { type: 'string', example: faker.internet.email() },
        password: commonPassword,
      };
    case 'loginResponse':
      return {
        token: { type: 'string', example: faker.internet.jwt() },
        role: { type: 'integer', example: defaultRole, enum: roles },
      };
    case 'forgetPasswordRequest':
      return {
        email: { type: 'string', example: faker.internet.email() },
      };
    case 'resetPasswordRequest':
      return {
        token: { type: 'string', example: faker.internet.jwt() },
        password: commonPassword,
      };
    case 'changePasswordRequest':
      return {
        currentPassword: commonPassword,
        newPassword: commonPassword,
      };
    case 'changePasswordResponse':
      return {
        name: { type: 'string', example: faker.person.fullName() },
        email: { type: 'string', example: faker.internet.email() },
      };
    case 'updateProfileRequest':
      return {
        name: { type: 'string', example: faker.person.fullName() },
        email: { type: 'string', example: faker.internet.email() },
        phoneNumber: { type: 'string', example: faker.string.numeric(10) },
        countryCode: { type: 'string', example: faker.helpers.arrayElement(['+1', '+44', '+91']) },
      };
    case 'resendVerificationRequest':
      return {
        email: { type: 'string', example: faker.internet.email() },
      };

    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};
