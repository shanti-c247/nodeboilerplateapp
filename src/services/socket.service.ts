import type { Server as HttpServer } from 'node:http';
import env from '@config/envVar';
import { logger } from '@config/logger';
import { socketVariables } from '@constants';
import type { ConnectedUsers, SocketStore } from '@customTypes';
import { socketAuthMiddleware } from '@middlewares';
import { Server, type Socket } from 'socket.io';

export const socketStore: SocketStore = {
  io: null,
  connectedUsers: new Map<string, ConnectedUsers>(),
};

/**
 * Initializes a Socket.IO server with specified configurations.
 *
 * @param httpServer - The HTTP server instance to bind the Socket.IO server to.
 * @returns The initialized Socket.IO server instance.
 *
 * @throws Will throw an error if the Socket.IO server fails to initialize.
 *
 * The function sets up CORS options, ping intervals, and timeouts based on environment variables.
 * It applies a socket authentication middleware and listens for connection events to handle
 * incoming socket connections.
 */

export const initializeSocketIO = (httpServer: HttpServer): Server => {
  try {
    socketStore.io = new Server(httpServer, {
      cors: {
        origin: env.CORS_ORIGIN?.split(','),
      },
      pingInterval: socketVariables.PING_INTERVAL,
      pingTimeout: socketVariables.PING_TIMEOUT,
    });

    socketStore.io.use(socketAuthMiddleware);
    socketStore.io.on('connection', handleConnection);

    logger.info('Socket.IO server initialized');
    return socketStore.io;
  } catch (error: any) {
    logger.error(`Failed to initialize Socket.IO server: ${error.message}`);
    throw error;
  }
};

/**
 * Handles a new socket connection by adding the user to the connected users map and setting up
 * socket event listeners.
 *
 * @param socket - The Socket.IO socket instance representing the connected client.
 *
 * The function extracts the user ID and email from the socket's data and stores the connected
 * user's information, including socket ID and last active timestamp, in the socket store.
 * It also joins the socket to a room identified by the user ID and logs the connection event.
 *
 * Listens for:
 * - 'notification': Logs received notifications.
 * - 'disconnect': Invokes the handleDisconnect function when the socket disconnects.
 * - 'error': Invokes the handleError function on socket errors.
 *
 * Catches and logs errors during the connection handling process.
 */
const handleConnection = (socket: Socket): void => {
  try {
    const { id: userId, email } = socket.data.user;

    socketStore.connectedUsers.set(socket.id, {
      userId,
      socketId: socket.id,
      lastActive: new Date(),
      email,
    });

    socket.join(`user:${userId}`);

    logger.info(`Client connected: ${socket.id} (User: ${userId})`);
    socket.on('disconnect', () => handleDisconnect(socket));
    socket.on('error', (error) => handleError(socket, error));
  } catch (error: any) {
    logger.error(`Error handling connection for socket ${socket.id}: ${error.message}`);
    socket.disconnect();
  }
};

/**
 * Handles a socket disconnection by removing the user from the connected users map and logging
 * the disconnect event.
 *
 * @param socket - The Socket.IO socket instance representing the disconnected client.
 *
 * The function logs the disconnect event with the socket ID and removes the user information
 * from the socket store.
 *
 * Catches and logs errors during the disconnect handling process.
 */
const handleDisconnect = (socket: Socket): void => {
  try {
    socketStore.connectedUsers.delete(socket.id);
    logger.info(`Client disconnected: ${socket.id}`);
  } catch (error: any) {
    logger.error(`Error handling disconnect for socket ${socket.id}: ${error.message}`);
  }
};

/**
 * Handles socket errors by logging the error and removing the user from the connected users map.
 *
 * @param socket - The Socket.IO socket instance representing the client with the error.
 * @param error - The error object containing the error message.
 *
 * The function logs the socket error event with the socket ID and removes the user information
 * from the socket store. If an error occurs during the error handling process, it is logged as well.
 */
const handleError = (socket: Socket, error: Error): void => {
  try {
    logger.error(`Socket error for client ${socket.id}: ${error.message}`);
    socketStore.connectedUsers.delete(socket.id);
  } catch (err: any) {
    logger.error(`Error handling socket error for socket ${socket.id}: ${err.message}`);
  }
};
