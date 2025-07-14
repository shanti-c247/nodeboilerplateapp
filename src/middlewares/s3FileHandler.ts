import path from 'path';
import { fileHandlerMessages, fileHandlerVariables } from '@constants';
import { commonHandler } from '@utils';
import { ErrorHandler, catchHandler } from '@utils';
import type { NextFunction, Request, Response } from 'express';
// Third-party modules
import multer, { type StorageEngine } from 'multer';
import { s3Storage } from '../utils/s3File.handler';

/**
 * Middleware to handle S3 file upload.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {void}
 * @throws {ErrorHandler} An error handler with a 400 status code if the file upload fails.
 */
export const s3UploadMiddleware = multer({
  storage: s3Storage as StorageEngine,
  limits: {
    fileSize: fileHandlerVariables.FILE_SIZE,
  },
  fileFilter: (_req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    if (fileHandlerVariables.FILE_FORMATS.includes(extname.slice(1))) {
      cb(null, true);
    } else {
      cb(new Error(fileHandlerMessages.FILE_TYPE_ERROR));
    }
  },
}).fields([
  {
    name: fileHandlerVariables.FILE_UPLOAD_FIELD,
    maxCount: fileHandlerVariables.FILE_UPLOAD_LIMIT,
  },
]);

/**
 * Handles S3 file uploading.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @throws {ErrorHandler} An error handler with a 400 status code if the file upload fails.
 */
export const uploadFileS3 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const convertedFileSize = await commonHandler.convertFileSize(fileHandlerVariables.FILE_SIZE, 'Byte', 'MB');
    s3UploadMiddleware(req, res, (error) => {
      if (error) {
        if (error.code === fileHandlerVariables.LIMIT_FILE_SIZE_ERROR_CODE) {
          return next(
            new ErrorHandler(
              `${error.field} ${fileHandlerMessages.FILE_SIZE_ERROR} ${convertedFileSize}MB`,
              400,
              error,
            ),
          );
        }
        if (error.code === fileHandlerVariables.ENOENT_ERROR_CODE) {
          return next(new ErrorHandler(`${fileHandlerMessages.DIRECTORY_FOUND_ERROR} ${error.field}.`, 400, error));
        }
        if (error.code === fileHandlerVariables.LIMIT_UNEXPECTED_FILE_ERROR_CODE) {
          return next(
            new ErrorHandler(
              `${fileHandlerMessages.FILE_UPLOAD_LIMIT_ERROR} ${fileHandlerVariables.FILE_UPLOAD_LIMIT}`,
              400,
              error,
            ),
          );
        }
        if (error.name === 'Error') {
          return next(new ErrorHandler(error.message, 400, error));
        }
        return next(new ErrorHandler(`${fileHandlerMessages.UPLOAD_FILE_ERROR} ${error.field}.`, 400, error));
      }
      next();
    });
  } catch (error) {
    catchHandler(error, next);
  }
};
