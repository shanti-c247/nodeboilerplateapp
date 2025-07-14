import { userHandler } from '@utils';

const userSchemas = {
  // User
  User: {
    type: 'object',
    properties: userHandler.userRandomData('userSchema'),
  },

  // User Creation
  CreateUserRequest: {
    type: 'object',
    required: ['name', 'email'],
    properties: userHandler.userRandomData('createUserRequest'),
  },
  UpdateUserRequest: {
    type: 'object',
    properties: userHandler.userRandomData('updateUserRequest'),
  },
  ChangeStatusRequest: {
    type: 'object',
    required: ['status'],
    properties: userHandler.userRandomData('changeStatusRequest'),
  },
  SetPasswordRequest: {
    type: 'object',
    required: ['token', 'password'],
    properties: userHandler.userRandomData('setPasswordRequest'),
  },
};
export default userSchemas;
