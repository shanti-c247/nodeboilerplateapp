// Constants
import { NOT_FOUND, UNAUTHORIZE, commonMessages, fileHandlerMessages } from '@constants';
// Middlewares
import { responseHandler } from '@middlewares';
// Services
import { localFileHandlerService } from '@services';
// Utils
import { ErrorHandler, catchHandler } from '@utils';
// Third-party modules
import type { NextFunction, Request, Response } from 'express';

/**
 * Handles get file details from local storage
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const fetchLocalFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const fileId: string = req.params.fileId;

    const response = await localFileHandlerService.fetchLocalFile(fileId);
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
 * Handles local file listing by user or admin
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const fetchLocalFileList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.UNAUTHORIZED, UNAUTHORIZE, null));
    }
    const response = await localFileHandlerService.fetchLocalFileList(user);
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
 * Handles local file uploading
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const localFileUpload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
    }
    if (!req?.files) {
      next(new ErrorHandler(fileHandlerMessages.SELECTED_FILE_ERROR, NOT_FOUND, null));
    }
    const filesParse = JSON.parse(JSON.stringify(req.files));
    const response = await localFileHandlerService.localFileUpload(user, filesParse);
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
