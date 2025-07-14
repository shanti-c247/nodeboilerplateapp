// constants
import { authMessages, commonMessages } from '@constants';

// utils
import { swaggerHandler } from '@utils';

const authResponses = {
  AuthUserCreated: swaggerHandler.createSuccessResponse(authMessages.USER_REGISTERED, {
    $ref: '#/components/schemas/AuthUser',
  }),
  UserVerified: swaggerHandler.createSuccessResponse(authMessages.VERIFY_EMAIL_SUCCESS, {
    $ref: '#/components/schemas/VerifyEmailResponse',
  }),

  UserLoggedIn: swaggerHandler.createSuccessResponse(authMessages.LOGIN_SUCCESS, {
    $ref: '#/components/schemas/LoginResponse',
  }),
  UserProfileUpdated: swaggerHandler.createSuccessResponse(authMessages.UPDATE_PROFILE, {
    $ref: '#/components/schemas/AuthUser',
  }),

  UserForgetPassword: swaggerHandler.createSuccessResponse(commonMessages.SHARE_RESET_LINK, {
    $ref: '#/components/schemas/ForgetPasswordResponse',
  }),
  UserResetPassword: swaggerHandler.createSuccessResponse(authMessages.PASSWORD_CHANGED, {
    $ref: '#/components/schemas/AuthUser',
  }),
  UserChangePassword: swaggerHandler.createSuccessResponse(authMessages.PASSWORD_CHANGED, {
    $ref: '#/components/schemas/ChangePasswordResponse',
  }),
  AuthUserResponse: swaggerHandler.createSuccessResponse(authMessages.USER_PROFILE, {
    $ref: '#/components/schemas/AuthUser',
  }),
  VerificationResent: swaggerHandler.createSuccessResponse(authMessages.USER_VERIFY_EMAIL, {
    $ref: '#/components/schemas/ResendVerificationResponse',
  }),
  LogoutSuccess: swaggerHandler.createSuccessResponse(authMessages.LOGOUT_SUCCESS, {
    $ref: '#/components/schemas/LogoutSuccessResponse',
  }),
};

export default authResponses;
