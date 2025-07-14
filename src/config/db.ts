import mongoose from 'mongoose';
import env from './envVar';
import { logger } from './logger';

//Custom types
import type { CustomError } from '@customTypes';

const connectUserDB = async () => {
  try {
    const mongoUri = `${env.MONGODB_URI}`;

    const conn = await mongoose.connect(mongoUri || '');
    logger.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    const error = err as CustomError;
    logger.error(`MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

export const disconnectUserDB = async () => {
  await mongoose.disconnect();
};

export default connectUserDB;
