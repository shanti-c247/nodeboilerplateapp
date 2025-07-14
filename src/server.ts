// Third-party libraries
import 'module-alias/register'; // Import at the top
import connectUserDB from '@config/db';
import env from '@config/envVar';
import { logger } from '@config/logger';
import dotenv from 'dotenv';
import { createApp } from './app';
import './types/common.type';
import { type Server, createServer } from 'node:http';
import { commonHandler } from '@utils';
dotenv.config();
const App = createApp();
const httpServer = createServer(App);
const port: number = Number(env.PORT);

/**
 * Initializes the application by connecting to the database and starting the server.
 *
 * This function will exit the process if connecting to the database fails.
 */
const run = async (): Promise<void> => {
  try {
    await connectUserDB();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    logger.error(`Could not connect to: ${env.MONGODB_URI} : ${errorMessage}`);
    process.exit(1);
  }

  await startApplication();
  await connectRedisServer();
};
/**
 * Starts the Express server by making it listen on the specified port.
 *
 * This function will trigger the {@link onServerListen} callback when the server
 * is successfully listening.
 */
const startApplication = async (): Promise<void> => {
  const socketService: { initializeSocketIO?: (server: Server) => void } = await commonHandler.conditionalImport(
    'src/services/socket.service.ts',
    '../services/socket.service',
  );
  if (socketService?.initializeSocketIO) {
    socketService.initializeSocketIO(httpServer);
  }
  httpServer.listen(port, () => onServerListen());
};

/**
 * Connect with redis and manage methods of redis
 */
const connectRedisServer = async () => {
  await commonHandler.conditionalImport('src/redisApp.ts', '../redisApp');
};

/**
 * Logs a message when the Express server is successfully listening on the specified port.
 *
 * @remarks This function is called by {@link startApplication} when the server is ready.
 */
const onServerListen = async (): Promise<void> => {
  logger.info(`Express server listening on port ${port}`);
};

(async () => {
  await run();
})();
