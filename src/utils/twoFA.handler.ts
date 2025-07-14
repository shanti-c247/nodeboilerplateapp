import * as crypto from 'node:crypto';
import env from '@config/envVar';
import { logger } from '@config/logger';
import { twoFAVariables } from '@constants';
import type { IAppSecret, IRecoveryCode } from '@customTypes';
//Third-party modules
import { TwoFactorMethod } from '@enums';
import { faker } from '@faker-js/faker';
import * as qrcode from 'qrcode';
import * as speakeasy from 'speakeasy';
// third party api
import { Twilio } from 'twilio';

// Twilio Credentials
const accountSid = env.TWILIO_ACCOUNT_SID; // Replace with your Twilio Account SID
const authToken = env.TWILIO_AUTH_TOKEN; // Replace with your Twilio Auth Token
// Verification Service SID
const serviceSid = env.TWILIO_SERVICE_SID;
const client = new Twilio(accountSid, authToken);

/**
 * Generates random data for a twoFactorAuth schema based on the provided type.
 * @param {string} type - The type of twoFactorAuth schema to generate data for.
 * @returns {Record<string, unknown>} - The random data for the twoFactorAuth schema.
 * @throws {Error} If the type is not supported.
 */
export const twoFactorAuthRandomData = (type: string) => {
  switch (type) {
    case 'activeTwoFactorAuthRequest':
      return {
        email: { type: 'string', example: faker.internet.email() },
        password: { type: 'string', example: faker.internet.password() },
        isTwoAuthEnabled: { type: 'boolean', example: 'true' },
        twoFAMethodType: { type: 'string', example: TwoFactorMethod.EMAIL },
      };
    case 'sendEmailRequest':
      return {
        email: { type: 'string', example: faker.internet.email() },
        password: { type: 'string', example: faker.internet.password() },
        phoneNumber: { type: 'string', example: '769386759' },
        twoFAMethodType: { type: 'string', example: TwoFactorMethod.EMAIL },
      };
    case 'sendPhoneRequest':
      return {
        phone: { type: 'string', example: faker.internet.email() },
        password: { type: 'string', example: faker.internet.password() },
      };
    case 'sendAppRequest':
      return {
        email: { type: 'string', example: faker.internet.email() },
      };
    case 'verifyOtpRequest':
      return {
        email: { type: 'string', example: faker.internet.email() },
        otp: { type: 'string', example: 123456 },
      };
    case 'verifyCodeRequest':
      return {
        email: { type: 'string', example: faker.internet.email() },
        code: { type: 'string', example: '4DD2D217' },
      };
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};

/**
 * Generates a custom OTP (One-Time Password).
 * @param {number} length - Length of the OTP to generate.
 * @param {string} charset - Characters allowed in the OTP (default: digits).
 * @description Generate a 6-digit numeric OTP
 * @returns {string} - The generated OTP.
 */
export const generateTwoFAOTP = async (length: number, charset: string) => {
  if (length <= 0) {
    throw new Error('OTP length must be greater than zero.');
  }
  let otp = '';
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    otp += charset[randomIndex];
  }
  return otp;
};

// Utility to Generate Recovery Codes
export const generateRecoveryCodes = async (): Promise<IRecoveryCode[]> => {
  const codes: IRecoveryCode[] = [];
  for (let i = 0; i < 5; i++) {
    const hashedCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push({ code: hashedCode, used: false });
  }
  return codes;
};

/**
 * This method is for generate otp secret token for verify user
 *
 * @returns
 */
export const generateAppTokenSecret = async (email: string): Promise<any> => {
  const secret = speakeasy.generateSecret({
    name: `${env.AUTH_TOKEN_APP_NAME} (${email})`, //The application name
    length: twoFAVariables.TOKEN_LENGTH,
  });
  /** save secret token for verify user which MFA process */
  return secret;
};

/**
 * This method is for generate otpQR for verify user
 *
 * @returns
 */
export const generateAppQR = async (secretToken: IAppSecret): Promise<string> => {
  // Generate a QR code for the otpauth URL
  return qrcode.toDataURL(secretToken.otpauth_url);
};

/**
 * This method is use for  verify user with given code(otp) is correct or not
 *
 * @returns
 */
export const verifyAppOtp = async (otp: string, secret: IAppSecret): Promise<boolean> => {
  try {
    const isVerifiedUser = speakeasy.totp.verify({
      secret: secret.base32,
      encoding: 'base32',
      token: otp,
      window: 1,
    });
    if (isVerifiedUser) {
      return true;
    }
    return false;
  } catch (err) {
    const error = err instanceof Error;
    throw error;
  }
};

/**
 * Send SMS using Twilio
 * @param {string} to - Recipient phone number (e.g., +1234567890)
 * @param {string} channel - SMS channel
 * @returns {Promise} - Promise resolving the SMS response
 */
export const sendSmsToUser = async (to: string, channel: string) => {
  try {
    const verification = await client.verify.v2.services(serviceSid).verifications.create({ to, channel });
    logger.info(`SMS sent successfully: ${verification.sid}`);
    return verification;
  } catch (error) {
    logger.error(`Error sending SMS: ${error}`);
    throw error;
  }
};

/**
 * Verify SMS OTP
 * @param {string} to - Recipient phone number (e.g., +1234567890)
 * @param {string} code - OTP code to verify
 * @returns {Promise} - Promise resolving the verification result
 * @throws {Error} - If the OTP is invalid
 */
export const verifySmsOTP = async (to: string, code: string) => {
  try {
    const verificationCheck = await client.verify.v2.services(serviceSid).verificationChecks.create({ to, code });

    if (verificationCheck.status === 'approved') {
      logger.info('Verification successful!');
    } else {
      throw new Error('Invalid OTP. Please try again.');
    }
    return;
  } catch (error) {
    logger.error(`Error sending SMS: ${error}`);
    throw error;
  }
};

/**
 * Validates the phone number is in E.164 format
 * @param phoneNumber - Phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const e164Regex = /^\+[1-9]\d{1,14}$/; // E.164 regex pattern
  return e164Regex.test(phoneNumber);
};
