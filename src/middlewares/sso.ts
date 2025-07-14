//Third-party modules
import type { NextFunction, Request, Response } from 'express';
import passport from 'passport';

//Constants
import { BAD_REQUEST, commonMessages, ssoMessages } from '@constants';

import { logger } from '@config/logger';
//Enums
import { Scope, Strategy } from '@enums';
//Utils
import { ErrorHandler } from '@utils';

/**
 * Authenticates the user using the passport library with the specified strategy.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the chain.
 *
 * @throws {ErrorHandler} If the strategy is invalid or there is an internal server error.
 *
 * @returns {Promise<void>} The promise returned by the passport authentication middleware.
 */
export const passportAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const strategy = req.body.strategy || Strategy.Google;

    req.session.destroy((err) => {
      if (err) {
        logger.error(`Error destroying session: ${err}`);
      }
    });

    if (strategy === Strategy.Google) {
      passport.authenticate(Strategy.Google, {
        scope: [Scope.Email, Scope.Profile],
      })(req, res, next);
    } else if (strategy === Strategy.Facebook) {
      passport.authenticate(Strategy.Facebook, {
        scope: [Scope.Email],
      })(req, res, next);
    } else {
      return next(new ErrorHandler(ssoMessages.INVALID_STRATEGY, BAD_REQUEST, null));
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    return next(new ErrorHandler(errorMessage, BAD_REQUEST, error));
  }
};
