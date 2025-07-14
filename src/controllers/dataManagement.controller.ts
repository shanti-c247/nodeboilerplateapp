// Third-party modules
import type { NextFunction, Request, Response } from 'express';

// Middlewares
import { responseHandler } from '@middlewares';

// Utils
import { ErrorHandler, catchHandler, dataManagementHandler } from '@utils';

// Services
import { dataManagementService } from '@services';

// Constants
import { UNAUTHORIZE, commonMessages, dataManagementVariables } from '@constants';

// Types
import type { ExportFilters, IApiResponse, IFileType } from '@customTypes';

/**
 * Handles uploading a CSV file
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const file: IFileType = req.files ? JSON.parse(JSON.stringify(req.files)) : null;
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
    }
    const response = await dataManagementService.uploadFile(file, user);

    const { success, message, status, data } = response as IApiResponse;

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
 * Handles downloading a CSV file
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const downloadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query: ExportFilters = req.query;
    const filters: ExportFilters = await dataManagementHandler.buildFilters(query);
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
    }

    const { status, success, message, data } = await dataManagementService.downloadFile(filters, user);

    if (success) {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${dataManagementVariables.ATTATCHMENT_NAME}"`);
      res.status(status).send(data);
    } else {
      next(new ErrorHandler(message, status));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles downloading a PDF file
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const downloadPdf = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query: ExportFilters = req.query;
    const filters: ExportFilters = await dataManagementHandler.buildFilters(query);
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
    }
    const { status, success, message, data } = await dataManagementService.downloadPdf(filters, user);

    if (success) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${dataManagementVariables.PDF_ATTATCHMENT_NAME}"`);
      res.status(status).send(data);
    } else {
      next(new ErrorHandler(message, status));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles retrieving a list of data batches created by the user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getBatches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
    }
    const { success, message, status, data } = await dataManagementService.getBatches(user);
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
 * Handles deleting a batch and its associated data items
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const deleteDataItemsByBatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params as { batchId: string };
    const { success, message, status, data } = await dataManagementService.deleteDataItemsByBatch(params);
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};
