//third party imports
import type { NextFunction, Request, Response } from 'express';

//utils
import { ErrorHandler, catchHandler } from '@utils';

//middlewares
import { responseHandler } from '@middlewares';

//services
import { notificationService } from '@services';

//types
import type { NotificationQueryParams } from '@customTypes';

/**
 * Handles retrieving the list of notifications
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getNotificationList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, type, startDate, endDate }: NotificationQueryParams = req.query;
    const id: any = req.user?.id;
    const { status, success, message, data } = await notificationService.getNotificationList(
      page,
      limit,
      id,
      type,
      startDate,
      endDate,
    );
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};
