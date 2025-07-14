//Constants
// import { commonVariables } from '@constants';

import { MAX_CHARACTERS_LENGTH, VALIDATION_MESSAGE_KEYS } from '../../constants/variables/common.variables';

export const INVALID_NAME_FORMAT_MESSAGE = {
  [VALIDATION_MESSAGE_KEYS.namePatternMaxBase]: `Name must be at least ${MAX_CHARACTERS_LENGTH} characters long.`,
  [VALIDATION_MESSAGE_KEYS.nameRegexBase]: 'Name must not contain only numbers',
};
export const SELF_DELETE_ERROR_MESSAGE = 'You cannot delete yourself.';
export const SUBJECT_SET_PASSWORD = 'Password set request.';
export const USER_CREATED_AND_EMAIL_SENT = 'User created & invite send successfully.';
export const USER_CREATED_AND_EMAIL_NOT_SENT = 'User created but invite not sent.';
export const USER_CREATION_FAILED = 'User creation failed.';
export const USER_UPDATED = 'User updated successfully.';
export const USER_FETCH_SUCCESS = 'User fetched successfully.';
export const USERS_FETCH_SUCCESS = 'Users fetched successfully.';
export const USER_DELETE_SUCCESS = 'User deleted successfully.';
export const USER_UPDATED_SUCCESS = 'User updated successfully.';
export const USER_SET_PASSWORD_LINK_EXPIRED = 'Password setting link has expired.';
export const USER_SET_PASSWORD_LINK_INVALID = 'Invalid password setting link.';
export const USER_PASSWORD_SET_SUCCESS = 'Password set successfully.';
export const USER_STATUS_UPDATED = 'User status updated successfully.';
export const USER_UPDATE_NOTIFICATION = {
  title: 'User Update',
  message: 'Your details have been updated.',
};
