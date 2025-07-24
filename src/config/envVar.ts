import { commonMessages } from '@constants';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'HOST',
  'API_URL',
  'JWT_SECRET',
  'AUTH_COOKIE_NAME',
  'MONGODB_URI',
  'CORS_ORIGIN',
  'EXPRESS_JSON_LIMIT',
  'AWS_REGION',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'BUCKET_NAME',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_CALLBACK_URL',
  'FACEBOOK_CLIENT_ID',
  'FACEBOOK_CLIENT_SECRET',
  'FACEBOOK_CALLBACK_URL',
  'SMTP_MAIL_SERVICE',
  'SMTP_SENDER_EMAIL',
  'SMTP_SENDER_PASSWORD',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_IS_SECURE',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_SERVICE_SID',
  'AUTH_TOKEN_APP_NAME',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'REDIS_URL',
];
// Object to hold exported environment variables
const env: Record<string, any> = {};
// Ensure all required variables are present and add them to `env`
requiredEnvVars.forEach((key) => {
  const value = process.env[key];
  if (!value) {
    // throw new Error(`${commonMessages.MISSING_ENV_VARIABLES}: ${key}`);
    console.log('hello');

  }
  env[key] = value; // Dynamically add to the export object
});
export default env;
