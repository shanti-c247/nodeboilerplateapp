import { twoFAController } from '@controllers';
import { validate } from '@middlewares';
import { twoFAValidations } from '@validations';
import express from 'express';
const router = express.Router();

router.post('/active', validate(twoFAValidations.activeValidator), twoFAController.enableTwoFA);

// email /sms/app
router.post('/send-otp', validate(twoFAValidations.generateSecretValidator), twoFAController.sendTwoFACode);

router.patch('/verify-otp', validate(twoFAValidations.verifyCodeValidator), twoFAController.verifyTwoFACode);

router.post('/recover', validate(twoFAValidations.appValidator), twoFAController.recoveryCode);
export default router;
