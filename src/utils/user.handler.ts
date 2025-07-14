//Third-party modules
import crypto from 'node:crypto';

//Constants
import { commonVariables, userVariables } from '@constants';

//Utils
import { commonHandler } from '@utils';

//Custom types
import type { IUser, SetPasswordTokenResult } from '@customTypes';

//Enums
import { UserStatus } from '@enums';
//Third-party modules
import { faker } from '@faker-js/faker';

/**
 * Generates a hashed version of a token using the algorithm specified in
 * the HASH_METHOD configuration variable.
 * @param token - The token to be hashed.
 * @returns A hashed version of the token.
 */
export const generateHashedToken = (token: string): string => {
  return crypto.createHash(commonVariables.HASH_METHOD).update(token).digest('hex');
};

/**
 * Generates a random token, its hashed version, and an expiration date for a set password flow.
 * @returns An object containing the generated token, its hashed version, and the expiration date.
 */
export const generateSetPasswordToken = async (): Promise<SetPasswordTokenResult> => {
  // Generate a random token and its hashed version
  const token: string = crypto.randomBytes(32).toString('hex');
  const hashedToken: string = generateHashedToken(token);

  // Calculate token expiration duration in milliseconds
  const expireDuration: number = await commonHandler.convertTime(
    Number(userVariables.SET_PASSWORD_EXPIRE),
    userVariables.SET_PASSWORD_TOKEN_UNIT,
    'millisecond',
  );

  // Set the expiration date based on current time and duration
  const expireDate: Date = new Date(Date.now() + expireDuration);

  return { token, hashedToken, expireDate };
};

/**
 * Generates random data for user related APIs.
 * @param {string} type The type of random data to generate. Supported types are:
 *   - `userSchema`: Random data conforming to the user schema.
 *   - `createUserRequest`: Random data for creating a new user.
 *   - `updateUserRequest`: Random data for updating a user.
 *   - `changeStatusRequest`: Random data for changing the status of a user.
 *   - `setPasswordRequest`: Random data for setting a new password for a user.
 * @returns {object} An object containing the random data.
 * @throws {Error} If the `type` parameter is not supported.
 */
export const userRandomData = (type: string) => {
  const commonData = {
    name: { type: 'string', example: faker.person.fullName() },
    email: { type: 'string', example: faker.internet.email() },
    phoneNumber: { type: 'string', example: faker.string.numeric(10) },
    countryCode: { type: 'string', example: faker.helpers.arrayElement(['+1', '+44', '+91']) },
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
    case 'userSchema':
      return {
        ...commonData,
        id: { type: 'string', example: faker.string.uuid() },
        status: commonStatus,
        isDeleted: { type: 'boolean', example: false },
        isTwoAuthEnabled: { type: 'boolean', example: false },
        preferredTwoFAMethods: {
          type: 'array',
          example: [],
        },
        recoveryCodes: {
          type: 'array',
          example: [],
        },
        createdAt: { type: 'string', example: faker.date.past() },
        updatedAt: { type: 'string', example: faker.date.recent() },
      };
    case 'createUserRequest':
      return commonData;
    case 'updateUserRequest':
      return {
        ...commonData,
        status: commonStatus,
      };
    case 'changeStatusRequest':
      return {
        status: commonStatus,
      };
    case 'setPasswordRequest':
      return {
        password: commonPassword,
        token: { type: 'string', example: faker.string.uuid() },
      };
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};
