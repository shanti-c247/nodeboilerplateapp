import path from 'node:path';
import env from '@config/envVar';
import { OK } from '@constants';
import type { ICustomError } from '@customTypes';
import { errorMiddleware } from '@middlewares';
import { indexRoute, swaggerRoute } from '@routes';
import cors from 'cors';
import dotenv from 'dotenv';
// Third-party libraries
import express, { type NextFunction, type Request, type Response } from 'express';
import session from 'express-session';
import helmet from 'helmet';

dotenv.config();
/**
 * Creates and configures an Express application.
 *
 * - Sets up static file serving for the public directory.
 * - Uses Helmet for security hardening.
 * - Configures JSON parsing with a custom raw body verification.
 * - Enables CORS with allowed origins and methods.
 * - Configures session management using express-session.
 * - Initializes and configures Passport for authentication.
 * - Defines the root route and main API routes.
 * - Sets up Swagger for API documentation.
 * - Includes error handling middleware.
 *
 * @returns {express.Express} The configured Express application.
 */

const createApp = () => {
  const app = express();
  const publicDirectory = path.resolve(__dirname, '..', 'public');
  app.use(express.static(publicDirectory));
  app.use(helmet());
  app.use(
    express.json({
      limit: env.EXPRESS_JSON_LIMIT,
      verify: (req: any, _res, buf) => {
        req.rawBody = buf.toString();
      },
    }),
  );

  app.use(
    cors({
      origin: env.CORS_ORIGIN.split(','),
      methods: 'GET,POST,PUT,PATCH,DELETE',
    }),
  );

  // Configure express-session
  app.use(
    session({
      secret: env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set true if using HTTPS
    }),
  );

  // Root route
  app.get('/', async (_req: express.Request, res: express.Response) => {
    res.status(OK).send('*** Hello 👋 from Api server ***');
  });

  // Define main routes
  app.use('/api/v1', indexRoute);

  // Swagger documentation routes
  app.use('/api/v1/docs', swaggerRoute);

  app.get('/api/v1', (_req, res) => {
    res.send('Hello ✋ Boiler Plate 🚀🥳🎉');
  });
  // Error handling middleware
  app.use(errorMiddleware);

  app.use((err: ICustomError, _req: Request, res: Response, _next: NextFunction) => {
    const response = res.status(err.statusCode);
    if (err.sendErrMsgToCaller === true && err.message != null && err.message !== '') {
      response.json(err.message);
      return;
    }
    response.send();
  });

  return app;
};
export { createApp };
