import { UNAUTHORIZE, commonMessages } from '@constants';
import { responseHandler } from '@middlewares';
import { ssoService } from '@services';
import { ErrorHandler, catchHandler } from '@utils';
import type { NextFunction, Request, Response } from 'express';

/**
 * Handles Login user after successfully sso-support authenticated
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const ssoLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
    }

    const response = await ssoService.ssoLogin(user, res);
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
