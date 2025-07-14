import express from 'express';
import authRoute from './auth.route';
import dataManagementRoute from './dataManagement.route';
import localFileHandlerRoute from './localFileHandler.route';
import notificationRoute from './notification.route';
import paymentRoute from './payment.route';
import s3FileHandlerRoute from './s3FileHandler.route';
import ssoRoute from './sso.route';
import twoFARoute from './twoFA.route';
import userRoute from './user.route';
import redisRoute from './redis.route';

const indexRoute = express.Router();

indexRoute.use('/auth', authRoute);
indexRoute.use('/user', userRoute);
indexRoute.use('/local-files', localFileHandlerRoute);
indexRoute.use('/s3-files', s3FileHandlerRoute);
indexRoute.use('/sso', ssoRoute);
indexRoute.use('/two-factor-auth', twoFARoute);
indexRoute.use('/data-management', dataManagementRoute);

indexRoute.use('/payment', paymentRoute);
indexRoute.use('/notification', notificationRoute);
indexRoute.use('/redis', redisRoute);

export default indexRoute;
