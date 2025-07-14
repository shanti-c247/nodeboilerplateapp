//Third-party modules
import Joi from 'joi';

//Config
import { defaultRole, roles } from '@config/index';

//Enums
import { UserStatus } from '@enums';

//Constants
import { commonMessages, commonVariables, userMessages } from '@constants';

export const createUserSchema = {
  body: Joi.object({
    name: Joi.string()
      .max(commonVariables.MAX_CHARACTERS_LENGTH)
      .regex(commonVariables.NAME_REGEX)
      .required()
      .messages(userMessages.INVALID_NAME_FORMAT_MESSAGE),
    email: Joi.string().email().required(),
    role: Joi.number()
      .integer()
      .valid(roles[0], roles[1])
      .default(defaultRole),
    status: Joi.number().integer().valid(UserStatus.Inactive, UserStatus.Active).default(UserStatus.Inactive),
    phoneNumber: Joi.string()
      .max(commonVariables.PHONE_NUMBER_MAX_LENGTH)
      .optional(),
    countryCode: Joi.string()
      .max(commonVariables.COUNTRY_CODE_MAX_LENGTH)
      .optional(),
  }),
};

export const changeStatusSchema = {
  params: Joi.object({
    userId: Joi.string().required(),
  }),
  body: Joi.object({
    status: Joi.number().integer().valid(UserStatus.Inactive, UserStatus.Active).required(), // assuming status is either 0 or 1
  }),
};

export const setPasswordSchema = {
  body: Joi.object({
    token: Joi.string().required(),
    password: Joi.string()
      .min(commonVariables.PASSWORD_MIN_LENGTH)
      .pattern(new RegExp(`${commonVariables.PASSWORD_REGEX}`))
      .required()
      .messages(commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
  }),
};

export const updateUserSchema = {
  params: Joi.object({
    userId: Joi.string().required(), // Ensure 'id' is provided in params
  }),
  body: Joi.object({
    name: Joi.string()
      .max(commonVariables.MAX_CHARACTERS_LENGTH)
      .regex(commonVariables.NAME_REGEX)
      .messages(userMessages.INVALID_NAME_FORMAT_MESSAGE)
      .optional(),
    email: Joi.string().email().optional(),
    role: Joi.number()
      .integer()
      .valid(roles[0], roles[1])
      .default(defaultRole)
      .optional(),
    status: Joi.number().integer().valid(UserStatus.Inactive, UserStatus.Active).default(UserStatus.Active).optional(), // assuming status is either 0 or 1
    phoneNumber: Joi.string()
      .max(commonVariables.PHONE_NUMBER_MAX_LENGTH)
      .optional(),
    countryCode: Joi.string()
      .max(commonVariables.COUNTRY_CODE_MAX_LENGTH)
      .optional(),
  }),
};
