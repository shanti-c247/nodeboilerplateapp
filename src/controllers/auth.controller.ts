//Third-party modules
import type { NextFunction, Request, Response } from 'express';

import { logger } from '@config/logger';
//Constants
import { NOT_FOUND, UNAUTHORIZE, authMessages, commonMessages } from '@constants';
//Middlewares
import { responseHandler } from '@middlewares';
//Services
import { authService } from '@services';
//Utils
import { ErrorHandler, catchHandler } from '@utils';

/**
 * Handles registering a user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body;
    const response = await authService.register(body);
    const { success, message, status, data } = response;
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles verify user by clicking on email verification link.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.log(`verify email: ${req.body}`);
    const { token } = req.body;
    if (!token) {
      next(new ErrorHandler(authMessages.VERIFY_EMAIL_TOKEN_MISSING, NOT_FOUND, null));
    }
    const response = await authService.verifyEmail(token as string);
    const { success, message, status, data } = response;
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles login a user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body;
    const response = await authService.login(payload, res);
    const { success, message, status, data } = response;
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles user profile
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const userProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
    }
    const response = await authService.userProfile(user);
    const { success, message, status, data } = response;
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles updating user profile.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
    }
    const body = req.body;
    const response = await authService.updateProfile(user, body);
    const { success, message, status, data } = response;
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles user forget password
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const forgetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body;
    const response = await authService.forgetPassword(body);
    const { success, message, status, data } = response;
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles user reset password by clicking on email reset link.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body;

    const response = await authService.resetPassword(body);
    const { success, message, status, data } = response;
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles change password by logged-in user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body;
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
    }
    const response = await authService.changePassword(user, body);
    const { success, message, status, data } = response;
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles resending email verification link
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const resendEmailVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    const response = await authService.resendEmailVerification(email);
    const { success, message, status, data } = response;
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles user logout
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await authService.logout(res);
    const { success, message, status, data } = response;
    responseHandler(res, message, status, data);
  } catch (error) {
    catchHandler(error, next);
  }
};
