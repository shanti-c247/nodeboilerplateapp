// constants
import { ssoMessages, ssoVariables } from '@constants';

// utils
import { swaggerHandler } from '@utils';

const ssoResponses = {
  SSOLoginSuccess: swaggerHandler.createSuccessResponse(ssoMessages.SSO_LOGIN_SUCCESS, {
    $ref: '#/components/schemas/SSOUserResponse',
  }),

  GoogleCallback: swaggerHandler.createSuccessResponse(ssoMessages.SSO_REDIRECT, {
    $ref: ssoVariables.REF_SSO_SWAGGER,
  }),

  FacebookCallback: swaggerHandler.createSuccessResponse(ssoMessages.SSO_REDIRECT, {
    $ref: ssoVariables.REF_SSO_SWAGGER,
  }),

  // User profile fetched successfully
  SSOProfileFetched: swaggerHandler.createSuccessResponse(ssoMessages.SSO_PROFILE_FETCH_SUCCESS, {
    $ref: ssoVariables.REF_SSO_SWAGGER,
  }),
};

export default ssoResponses;
