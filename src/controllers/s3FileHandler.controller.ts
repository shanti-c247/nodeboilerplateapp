// Constants
import { NOT_FOUND, UNAUTHORIZE, commonMessages, fileHandlerMessages } from '@constants';
// Middlewares
import { responseHandler } from '@middlewares';
// Services
import { s3FileHandlerService } from '@services';
// Utils
import { ErrorHandler, catchHandler } from '@utils';
// Third-party modules
import type { NextFunction, Request, Response } from 'express';

/**
 * Handles get file details from s3-bucket
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const fetchS3File = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const fileId: string = req.params.fileId;
    const response = await s3FileHandlerService.fetchS3File(fileId);
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
 * Handles s3 file listing
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const fetchS3FileList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
    }
    const response = await s3FileHandlerService.fetchS3FileList(user);
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
 * Handles file uploading on aws s3.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const s3FileUpload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
    }
    if (!req?.files) {
      next(new ErrorHandler(fileHandlerMessages.SELECTED_FILE_ERROR, NOT_FOUND, null));
    }
    const filesParse = JSON.parse(JSON.stringify(req.files));
    const response = await s3FileHandlerService.s3FileUpload(user, filesParse);
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
