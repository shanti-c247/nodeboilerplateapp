//Constants
import { UNAUTHORIZE, commonMessages, commonVariables } from '@constants';
//Custom types
import type { AuthTokenPayload, ICustomError } from '@customTypes';

//Internal modules
import env from '@config/envVar';
import { logger } from '@config/logger';
//Utils
import { ErrorHandler, commonHandler } from '@utils';
import type { Socket } from 'socket.io';

/**
 * Socket authentication middleware.
 *
 * This middleware verifies the JWT token in the socket handshake and authorizes the connection.
 * If the token is invalid or missing, it returns an error to the client.
 * If the token is valid, it adds the user's ID and email to the socket data.
 *
 * @param {Socket} socket - Socket.IO socket object.
 * @param {(err?: Error) => void} next - Next function to call in the middleware chain.
 */
export const socketAuthMiddleware = async (socket: Socket, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return next(new ErrorHandler(commonMessages.UNAUTHORIZED, UNAUTHORIZE));
    }

    // Verify JWT token
    const jwtSecret = env.JWT_SECRET || 'secret';
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

    socket.data.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    logger.error(`Socket authentication failed: ${error}`);
    next(new Error('Authentication failed'));
  }
};
