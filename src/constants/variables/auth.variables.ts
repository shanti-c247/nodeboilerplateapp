export const VERIFY_EMAIL_TOKEN_EXPIRE = 1; // TOKEN expiration time (e.g., '1d' for one day)
export const VERIFY_EMAIL_TOKEN_EXPIRE_UNIT = 'hour'; //Supported units: year, month, day, hour, minute, second, millisecond
export const RESET_TOKEN_EXPIRE = 60; // Expiration time (in ms) for password reset tokens (10 minutes = 10m*60s*1000ms = 600000)
export const RESET_TOKEN_UNIT = 'minute'; // Supported units: year, month, day, hour, minute, second, millisecond
export const AUTH_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/auth/operations.ts';
export const JWT_TOKEN_EXPIRE = '1d'; //expire after 1 day(24h)
// Rate Limiting Constants
export const FORGET_PASSWORD_MAX_ATTEMPTS = 2; // Max attempts for password reset (2 requests)
export const FORGET_PASSWORD_WINDOW_MS = 15 * 60 * 1000; // 15 minutes in milliseconds
