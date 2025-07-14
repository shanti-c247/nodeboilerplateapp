import { ssoHandler } from '@utils';

const ssoSchemas = {
  // SSO User Profile Schema
  SSOUserProfile: {
    type: 'object',
    properties: ssoHandler.ssoRandomData('ssoSchema'),
  },

  // SSO Login Request
  SSOLoginRequest: {
    type: 'object',
    required: ['provider'],
    properties: ssoHandler.ssoRandomData('ssoLoginRequest'),
  },

  SSOUserResponse: {
    type: 'object',
    properties: ssoHandler.ssoRandomData('ssoUserResponse'),
  },
};
export default ssoSchemas;
