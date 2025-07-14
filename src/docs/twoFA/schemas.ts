import { twoFAHandler } from '@utils';

const twoFactorAuthSchemas = {
  ActiveTwoFactorAuthRequest: {
    type: 'object',
    required: ['email', 'isTwoAuthEnabled'],
    properties: twoFAHandler.twoFactorAuthRandomData('activeTwoFactorAuthRequest'),
  },
  SendEmailRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: twoFAHandler.twoFactorAuthRandomData('sendEmailRequest'),
  },
  SendPhoneRequest: {
    type: 'object',
    required: ['phone', 'otp'],
    properties: twoFAHandler.twoFactorAuthRandomData('sendPhoneRequest'),
  },
  SendAppRequest: {
    type: 'object',
    required: ['email'],
    properties: twoFAHandler.twoFactorAuthRandomData('sendAppRequest'),
  },

  VerifyOtpRequest: {
    type: 'object',
    required: ['email', 'otp'],
    properties: twoFAHandler.twoFactorAuthRandomData('verifyOtpRequest'),
  },
  VerifyCodeRquest: {
    type: 'object',
    required: ['email', 'code'],
    properties: twoFAHandler.twoFactorAuthRandomData('verifyCodeRequest'),
  },
};
export default twoFactorAuthSchemas;
