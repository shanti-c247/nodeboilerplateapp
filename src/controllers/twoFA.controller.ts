import { responseHandler } from '@middlewares';
import { ErrorHandler, catchHandler, twoFAHandler } from '@utils';
import type { NextFunction, Request, Response } from 'express';

import { BAD_REQUEST, twoFAMessages } from '@constants';
import type { IApiResponse } from '@customTypes';
import { TwoFactorMethod } from '@enums';
import { twoFAService } from '@services';

/**
 * Handles enable two factor authentication
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const enableTwoFA = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, isTwoAuthEnabled, twoFAMethodType } = request.body;
    const result = await twoFAService.activeTwoFAAuthentication(email, password, isTwoAuthEnabled, twoFAMethodType);
    const { success, message, status, data } = result;
    if (success) {
      responseHandler(response, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles sending the two factor authentication code
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
// not use at the moment
export const sendTwoFACode = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    let result: IApiResponse = {
      status: 0,
      success: false,
      message: '',
      data: null,
    };
    const { email, password, twoFAMethodType, phoneNumber } = request.body;
    if (twoFAMethodType === TwoFactorMethod.EMAIL) {
      result = await twoFAService.sendOtpToMail(email, password);
    }
    if (twoFAMethodType === TwoFactorMethod.PHONE) {
      result = await twoFAService.sendSmsCode(phoneNumber);
    }
    if (twoFAMethodType === TwoFactorMethod.APP) {
      result = await twoFAService.createQRCode(email);
    }
    const { success, message, status, data } = result;
    if (success) {
      responseHandler(response, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles verifying the two factor authentication code
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const verifyTwoFACode = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, otp } = request.body;
    const result: any = await twoFAService.verifyToken(email, otp, response);
    const { success, message, status, data } = result;
    if (success) {
      responseHandler(response, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles validating the recovery code
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
// not use at the moment
export const recoveryCode = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, code: recoveryCode } = request.body;
    const result = await twoFAService.validateRecoveryCode(email, recoveryCode, response);
    const { success, message, status, data } = result;
    if (success) {
      responseHandler(response, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};
