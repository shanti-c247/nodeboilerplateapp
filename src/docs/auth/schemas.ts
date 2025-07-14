import { authHandler } from '@utils';

const authSchemas = {
  // User
  AuthUser: {
    type: 'object',
    properties: authHandler.authRandomData('authSchema'),
  },

  // User Creation
  AuthCreateUserRequest: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: authHandler.authRandomData('registerRequest'),
  },
  // Verify Email Request
  VerifyEmailRequest: {
    type: 'object',
    required: ['token'],
    properties: authHandler.authRandomData('verifyRequest'),
  },
  VerifyEmailResponse: {
    type: 'object',
    properties: {},
  },
  // User Login Request
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: authHandler.authRandomData('loginRequest'),
  },
  // User Login Response
  LoginResponse: {
    type: 'object',
    required: ['token', 'role'],
    properties: authHandler.authRandomData('loginResponse'),
  },
  // User Login Request
  ForgetPasswordRequest: {
    type: 'object',
    required: ['email'],
    properties: authHandler.authRandomData('forgetPasswordRequest'),
  },
  ForgetPasswordResponse: {
    type: 'object',
    properties: {},
  },
  // User Login Request
  ResetPasswordRequest: {
    type: 'object',
    required: ['token', 'password'],
    properties: authHandler.authRandomData('resetPasswordRequest'),
  },
  // Change Password Request
  ChangePasswordRequest: {
    type: 'object',
    required: ['currentPassword', 'newPassword'],
    properties: authHandler.authRandomData('changePasswordRequest'),
  },
  // Change Password Response
  ChangePasswordResponse: {
    type: 'object',
    required: ['name', 'email'],
    properties: authHandler.authRandomData('changePasswordResponse'),
  },
  // Update Profile Request
  UpdateProfilerRequest: {
    type: 'object',
    properties: authHandler.authRandomData('updateProfileRequest'),
  },
  // Resend Verification Request
  ResendVerificationRequest: {
    type: 'object',
    required: ['email'],
    properties: authHandler.authRandomData('resendVerificationRequest'),
  },
  // Resend Verification Response
  ResendVerificationResponse: {
    type: 'object',
    properties: {},
  },
};

export default authSchemas;
