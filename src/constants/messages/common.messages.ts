import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  RESET_ATTEMPT_LIMIT_TIME,
  VALIDATION_MESSAGE_KEYS,
  MAX_CHARACTERS_LENGTH,
} from '../../constants/variables/common.variables';

export const DATABASE_ERROR = 'Mongoose database error.';
export const MISSING_ENV_VARIABLES = 'Missing required environment variable';
export const FORBIDDEN_ERROR = 'Forbidden.';
export const UNAUTHORIZED = 'Unauthorized.';
export const INTERNAL_SERVER_ERROR = 'Internal server error.';
export const RESOURCE_NOT_FOUND = 'Resource not found.';
export const UNKNOWN_ERROR = 'Unknown error occurred.';
export const FORGET_PASSWORD_ERROR = 'Unable to forget password';
export const EMAIL_NOT_SENT = 'Email not sent, please try again';
export const SHARE_RESET_LINK = 'If the email address is associated with an account, you will receive a password reset link shortly.';

export const SUBJECT_SET_PASSWORD = 'Password set request.';
export const EXPIRE_TOKEN = 'Token is expired.';
export const INVALID_PASSWORD_FORMAT = `Password must be between ${PASSWORD_MIN_LENGTH} to ${PASSWORD_MAX_LENGTH} characters, with an uppercase, lowercase, number, and special character.`;
export const BAD_REQUEST_ERROR_MESSAGE = 'Bad request.';
export const UNPROCESSABLE_ENTITY_ERROR_MESSAGE = 'Invalid input data.';
export const CONFLICT_ERROR = 'Conflict error.';
export const EXPIRE_JWT = 'Token is expired.';
export const TOO_MANY_RESET_ATTEMPTS = `Too many password reset attempts. Please try again after ${RESET_ATTEMPT_LIMIT_TIME} minutes.`;

export const INVALID_PASSWORD_FORMAT_MESSAGE = {
  [VALIDATION_MESSAGE_KEYS.passwordPatternBase]: INVALID_PASSWORD_FORMAT,
};
export const INVALID_NAME_FORMAT_MESSAGE = {
  [VALIDATION_MESSAGE_KEYS.namePatternMaxBase]: `${MAX_CHARACTERS_LENGTH} characters maximum is allowed in Name field.`,
  [VALIDATION_MESSAGE_KEYS.nameRegexBase]: 'Only alphabets are allowed in the Name field.',
};

export const INVALID_TOKEN = 'Invalid token.';
export const SESSION_TIMEOUT = 'Session timeout.';
export const USER_DEACTIVATE = 'User is deactivated.';
export const USER_NOT_FOUND = 'User not found.';
export const INVALID_CREDENTIALS = 'Incorrect email or password';
export const USER_ALREADY_EXISTS = 'User already exists.';
export const INVALID_FROM_UNIT = 'Invalid from unit';
export const INVALID_TO_UNIT = 'Invalid to unit';
export const SUPPORTED_TIME_UNITS = 'Supported units: year, month, day, hour, minute, second, millisecond.';
export const SUPPORTED_SIZE_UNITS = 'Supported units: year, month, day, hour, minute, second, millisecond.';
export const USER_WITH_THIS_EMAIL_ALREADY_EXISTS = 'User with this email already exists.';
