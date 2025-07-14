// constants
import { twoFAMessages } from '@constants';

// utils
import { swaggerHandler } from '@utils';

const twoFactorAuthResponses = {
  EnebleTwoFactorAuthResponse: swaggerHandler.createSuccessResponse(twoFAMessages.USER_UPDATED, {
    // '#/components/schemas/EnebleTwoFactorAuthResponse
    $ref: '',
  }),
  SendEmailResponse: swaggerHandler.createSuccessResponse(twoFAMessages.TOKEN_SENT, {
    // #/components/schemas/SendEmailResponse
    $ref: '',
  }),
  VerifyOtpResponse: swaggerHandler.createSuccessResponse(twoFAMessages.OTP_VERIFIED, {
    // '#/components/schemas/VerifyOtpResponse'
    $ref: '',
  }),
  VerifyCodeResponse: swaggerHandler.createSuccessResponse(twoFAMessages.VAILD_RECOVERY_CODE, {
    // '#/components/schemas/VerifyCodeResponse'
    $ref: '',
  }),
};

export default twoFactorAuthResponses;
