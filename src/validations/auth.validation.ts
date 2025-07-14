//Third-party modules
import Joi from 'joi';
//Constants
import { commonMessages, commonVariables } from '@constants';

export const registerSchema = {
  body: Joi.object({
    name: Joi.string()
      .max(commonVariables.MAX_CHARACTERS_LENGTH)
      .regex(commonVariables.NAME_REGEX)
      .required()
      .messages(commonMessages.INVALID_NAME_FORMAT_MESSAGE),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(commonVariables.PASSWORD_MIN_LENGTH)
      .max(commonVariables.PASSWORD_MAX_LENGTH)
      .pattern(new RegExp(`${commonVariables.PASSWORD_REGEX}`))
      .required()
      .messages(commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
    phoneNumber: Joi.string()
      .max(commonVariables.PHONE_NUMBER_MAX_LENGTH)
      .optional(),
    countryCode: Joi.string()
      .max(commonVariables.COUNTRY_CODE_MAX_LENGTH)
      .optional(),
  }).unknown(false),
};

export const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(false),
};

export const updateProfileSchema = {
  body: Joi.object({
    name: Joi.string()
      .max(commonVariables.MAX_CHARACTERS_LENGTH)
      .regex(commonVariables.NAME_REGEX)
      .required()
      .messages(commonMessages.INVALID_NAME_FORMAT_MESSAGE),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
      .max(commonVariables.PHONE_NUMBER_MAX_LENGTH)
      .optional(),
    countryCode: Joi.string()
      .max(commonVariables.COUNTRY_CODE_MAX_LENGTH)
      .optional(),
  }).unknown(false),
};

export const passwordResetSchema = {
  body: Joi.object({
    token: Joi.string().required(),
    password: Joi.string()
      .min(commonVariables.PASSWORD_MIN_LENGTH)
      .max(commonVariables.PASSWORD_MAX_LENGTH)
      .pattern(new RegExp(`${commonVariables.PASSWORD_REGEX}`))
      .required()
      .messages(commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
  }),
};

export const changePasswordSchema = {
  body: Joi.object({
    currentPassword: Joi.string()
      .min(commonVariables.PASSWORD_MIN_LENGTH)
      .max(commonVariables.PASSWORD_MAX_LENGTH)
      .pattern(new RegExp(`${commonVariables.PASSWORD_REGEX}`))
      .required()
      .messages(commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
    newPassword: Joi.string()
      .min(commonVariables.PASSWORD_MIN_LENGTH)
      .max(commonVariables.PASSWORD_MAX_LENGTH)
      .pattern(new RegExp(`${commonVariables.PASSWORD_REGEX}`))
      .required()
      .messages(commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
  }).unknown(false),
};

export const forgetPasswordSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const resendEmailVerificationSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};
