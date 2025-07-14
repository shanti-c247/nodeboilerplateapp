//Internal modules
import env from '@config/envVar';
//Constants
import {
  FORBIDDEN,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZE,
  UNPROCESSABLE_ENTITY,
  commonMessages,
  commonVariables,
} from '@constants';
//Custom types
import type { AuthTokenPayload, CustomError, ICustomError, IUser } from '@customTypes';
//Enums
import { UserStatus } from '@enums';
import { userCommonService } from '@services';
//Utils
import { ErrorHandler, commonHandler } from '@utils';
//Third-party modules
import type { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

/**
 * Middleware to authenticate a user from a JWT token.
 * @param {Request} req - Express request object.
 * @param {Response} _res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @throws {ErrorHandler} An error handler with a 401 status code if the token is invalid or missing.
 */
export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    // Extract token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return next(new ErrorHandler(commonMessages.UNAUTHORIZED, UNAUTHORIZE));

    // Verify JWT token
    const jwtSecret = env.JWT_SECRET;

    let decoded: AuthTokenPayload;
    try {
      decoded = await commonHandler.verifyJwt(token, jwtSecret);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      const err = error as ICustomError;
      const errorMessage =
        err.name === commonVariables.TOKEN_EXPIRED_ERROR
          ? commonMessages.SESSION_TIMEOUT
          : commonMessages.INVALID_TOKEN;
      return next(new ErrorHandler(errorMessage, UNAUTHORIZE));
    }

    const userDetails = await userCommonService.getUserById(decoded.id);
    if (!userDetails) return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, NOT_FOUND));
    if (userDetails.status === UserStatus.Inactive)
      return next(new ErrorHandler(commonMessages.USER_DEACTIVATE, UNAUTHORIZE));
    req.user = userDetails;
    next();
  } catch (err) {
    next(new ErrorHandler(commonMessages.INVALID_TOKEN, UNAUTHORIZE, err));
  }
};

/**
 * Middleware to authorize user access based on their role.
 *
 * This function checks if the user's role is included in the allowed roles.
 * If the user is not authorized, it returns a forbidden error.
 * If the user is authorized, it calls the next middleware in the chain.
 *
 * @param {...number[]} roles - Array of allowed roles.
 * @returns {Function} Middleware function to handle authorization.
 */
export const authorize = (...roles: number[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    if (!user || !roles.includes(user.role)) {
      return next(new ErrorHandler(commonMessages.FORBIDDEN_ERROR, FORBIDDEN, null));
    }
    next();
  };
};

/**
 * Middleware to validate request data against provided schemas.
 *
 * This function iterates over a set of schemas and validates the corresponding
 * parts of the request (e.g., body, params, query). If any validation errors
 * occur, it aggregates the error messages and passes them to the next middleware
 * as a `BAD_REQUEST`. If no errors occur, it calls the next middleware in the chain.
 *
 * @param {object} schemas - An object containing Joi schemas for validation.
 * @returns {Function} Middleware function to validate request data.
 */

export const validate = (schemas: any) => {
  return (req: any, _res: Response, next: NextFunction) => {
    const errors: string[] = [];
    commonVariables.SCHEMA_KEYS.forEach((key) => {
      // Ensure that `schemas[key]` exists and is properly typed
      const schema = schemas[key];
      if (schema) {
        const { error } = schema.validate(req[key], { abortEarly: false });

        if (error) {
          // Safe mapping and error handling
          const errorMessages = error.details
            .map((detail: CustomError) => detail.message?.replace(commonVariables.ERROR_MESSAGE_REGEX, ''))
            .filter(Boolean); // Filter out any null/undefined messages
          errors.push(...errorMessages);
        }
      }
    });
    if (errors.length > 0) {
      return next(new ErrorHandler(errors.join(', '), UNPROCESSABLE_ENTITY, null));
    }

    next();
  };
};

/**
 * Creates a rate limiter middleware
 * @param {number} maxRequests - Maximum number of requests allowed in the time window
 * @param {number} windowMs - Time window in milliseconds
 * @param {string} errorMessage - Message to send when rate limit is exceeded
 * @returns {rateLimit} - Express middleware for rate limiting
 */
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  return rateLimit({
    windowMs,
    max: maxRequests,
    message: {
      status: TOO_MANY_REQUESTS,
      success: false,
      message: commonMessages.TOO_MANY_RESET_ATTEMPTS,
      data: null,
    },
    standardHeaders: true, // Send rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req) => req.body.email || req.query.email,
  });
};
