import { TwoFactorMethod } from '@enums';
import Joi from 'joi';

export const activeValidator = {
  body: Joi.object({
    email: Joi.string().email().required(),
    isTwoAuthEnabled: Joi.boolean().required(),
    password: Joi.string().required(),
    twoFAMethodType: Joi.string()
      .valid(...Object.values(TwoFactorMethod)) // Ensure the methodType is one of the allowed values
      .required(),
  }),
};

export const generateSecretValidator = {
  body: Joi.object({
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    twoFAMethodType: Joi.string()
      .valid(...Object.values(TwoFactorMethod)) // Ensure the methodType is one of the allowed values
      .required(),
    phoneNumber: Joi.string().optional(),
  }),
};

export const smsValidator = {
  body: Joi.object({
    phoneNumber: Joi.string().required(),
  }),
};

export const verifyCodeValidator = {
  body: Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.number().required(),
  }),
};

export const appValidator = {
  body: Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().required(),
  }),
};
