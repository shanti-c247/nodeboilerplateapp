import dotenv from 'dotenv';
import serverless from 'serverless-http';
import { createApp } from '../../src/app';
import connectUserDB from '../../src/config/db';
dotenv.config();

// const api = express();
const App = createApp();

/**
 * A database connection function
 * @param { NO params required } connection
 */
connectUserDB();

export const handler = serverless(App);