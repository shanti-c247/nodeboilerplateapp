//Controllers
import { authVariables } from '@constants';
import { authController } from '@controllers';
//Middlewares
import { authenticate, createRateLimiter, validate } from '@middlewares';
//Validations
import { authValidations } from '@validations';
//Third-party modules
import express from 'express';

const router = express.Router();

// Rate Limiter for forget password functionality - max 2 requests in 15 minutes
// Using constants for max attempts and window duration
const forgetPasswordLimiter = createRateLimiter(
  authVariables.FORGET_PASSWORD_MAX_ATTEMPTS,
  authVariables.FORGET_PASSWORD_WINDOW_MS,
);

router.post('/register', validate(authValidations.registerSchema), authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', validate(authValidations.loginSchema), authController.login);

router.post(
  '/forgot-password',
  validate(authValidations.forgetPasswordSchema),
  forgetPasswordLimiter,
  authController.forgetPassword,
);
router.post('/reset-password', validate(authValidations.passwordResetSchema), authController.resetPassword);

router.get('/me', authenticate, authController.userProfile);
router.put(
  '/update-profile',
  validate(authValidations.updateProfileSchema),
  authenticate,
  authController.updateProfile,
);
router.post(
  '/change-password',
  authenticate,
  validate(authValidations.changePasswordSchema),
  authController.changePassword,
);
router.post(
  '/resend-verification',
  validate(authValidations.resendEmailVerificationSchema),
  forgetPasswordLimiter,
  authController.resendEmailVerification
);
router.post('/logout', authenticate, authController.logout);

export default router;
