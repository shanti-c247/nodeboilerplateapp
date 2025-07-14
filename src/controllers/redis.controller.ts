//third party imports
import type { NextFunction, Request, Response } from 'express';

//utils
import { ErrorHandler, catchHandler } from '@utils';

//middlewares
import { responseHandler } from '@middlewares';

//services
import { redisService } from '@services';
import { commonVariables, redisVariables } from '@constants';

//types

/**
 * Handles svae the data in redis cache
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const saveDataToRedisCache = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, success, message, data } = await redisService.saveToRedis(id);
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
 * Handles svae the data in redis cache
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getDatafromRedisCache = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, success, message, data } = await redisService.getData(id);
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
 * Handles svae the data in redis cache
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getAllDatafromRedisCache = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { search, sortField, sortOrder, limit, page }: any = req.query;
    const { status, success, message, data } = await redisService.getAll(search, sortField, sortOrder, limit, page);
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
 * Handles svae the data in redis cache
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const deleteDataFromRedisCache = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, success, message, data } = await redisService.removeData(id);
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};
