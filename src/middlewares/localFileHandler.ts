import path from 'path';
import { commonHandler } from '@utils';
import type { NextFunction, Request, Response } from 'express';
// Third-party modules
import multer from 'multer';

import { fileHandlerMessages, fileHandlerVariables } from '@constants';
import { ErrorHandler, catchHandler } from '@utils';

/**
 * Local file storage configuration.
 */
const localFileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    // File upload path
    const destinationPath = `${fileHandlerVariables.UPLOAD_DIR}/${fileHandlerVariables.UPLOAD_FOLDER}/`;
    cb(null, destinationPath);
  },
  filename: (_req, file, cb) => {
    //Upload file name
    const fileName = `${Date.now().toString()}-${file.originalname}`;
    cb(null, fileName);
  },
});

/**
 * Middleware to handle local file upload.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {void}
 * @throws {ErrorHandler} An error handler with a 400 status code if the file upload fails.
 */
const localUploadMiddleware = multer({
  storage: localFileStorage,
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
 * Handles local file uploading.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @throws {ErrorHandler} An error handler with a 400 status code if the file upload fails.
 */
export const uploadFileLocal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const convertedFileSize = await commonHandler.convertFileSize(fileHandlerVariables.FILE_SIZE, 'Byte', 'MB');
    localUploadMiddleware(req, res, (error) => {
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
          return next(
            new ErrorHandler(
              `${fileHandlerMessages.DIRECTORY_FOUND_ERROR} ${fileHandlerVariables.UPLOAD_DIR}.`,
              400,
              error,
            ),
          );
        }
        if (error.code === fileHandlerVariables.LIMIT_UNEXPECTED_FILE_ERROR_CODE) {
          return next(
            new ErrorHandler(`${fileHandlerMessages.FILE_UPLOAD_LIMIT_ERROR} for ${error.field} `, 400, error),
          );
        }
        if (error.name === 'Error') {
          return next(new ErrorHandler(error.message, 400, error));
        }
        return next(new ErrorHandler(`${fileHandlerMessages.UPLOAD_FILE_ERROR} ${error.field}.`, 400, error));
      }
      //Normalize paths in all uploaded files
      if (req.files) {
        const filesMap = req.files as { [fieldname: string]: Express.Multer.File[] };
        Object.keys(filesMap).forEach((fieldName) => {
          filesMap[fieldName].forEach((file) => {
            file.path = file.path.replace(`${fileHandlerVariables.PUBLIC_DIR}/`, '');
          });
        });
      }
      next();
    });
  } catch (error) {
    catchHandler(error, next);
  }
};
