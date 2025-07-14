export const TOKEN_EXPIRE = 1; // TOKEN expiration time (e.g., '1d' for one day)
export const TOKEN_EXPIRE_UNIT = 'day'; //Supported units: year, month, day, hour, minute, second, millisecond
export const CAST_ERROR = 'CastError'; // Error name for cast errors
export const DUPLICATE_KEY_ERROR = 11000; // Error code for duplicate key errors
export const ERROR_MESSAGE_REGEX = /[^a-zA-Z0-9-' ']/g; // Regular expression to clean error messages of any special characters
export const FRONTEND_APP_URL = 'http://localhost/client'; // Frontend base URL which the email link will point to
export const SERVER_URL = 'http://localhost'; // Frontend base URL which the email link will point to
export const HASH_METHOD = 'sha256'; // Hashing algorithm used for storing passwords
export const JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError'; // Error name for JSON Web Token errors
export const MONGO_ERRORS: string[] = ['MongooseError', 'MongoError']; // Error names for MongoDB errors
export const PASSWORD_REGEX = '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? ])[a-zA-Z0-9!#$@%&?]{8,20}$'; // Regular expression to validate password format
export const MAX_CHARACTERS_LENGTH = 50;
export const NAME_REGEX = /^(?!\d+$).*\w+/; // Regular expression to validate name format
export const PASSWORD_MIN_LENGTH = 8; // Minimum length of the password
export const PASSWORD_MAX_LENGTH = 20; // Minimum length of the password
export const PHONE_NUMBER_MAX_LENGTH = 15; // Maximum length of the phone number
export const COUNTRY_CODE_MAX_LENGTH = 5; // Maximum length of the country code
export const SCHEMA_KEYS = ['params', 'query', 'body']; // Validation schema keys (params, query, body) for the JOI validation
export const TOKEN_EXPIRED_ERROR = 'TokenExpiredError'; // Error name for token expired errors
export const JWT_TOKEN_EXPIRE = '1d'; //expire after 1 day(24h)
export const RESET_ATTEMPT_LIMIT_TIME = 15; // 15 minutes
export const USER_SENSITIVE_INFO_DB_COLUMNS: string[] = [
  '_id',
  '__v',
  'role',
  'password',
  'resetPasswordToken',
  'resetPasswordExpire',
]; // Sensitive information in the User model which should be excluded from the response
export const DEVELOPMENT = 'development';
export const MILLISECOND = 'millisecond';
export const COOKIE_SAME_SITE = 'strict'; // Set a cross-site cookie for third-party contexts

// Pagination response schema
export const PAGINATION_META_SCHEMA = {
  type: 'object',
  properties: {
    total: { type: 'integer', example: 100 },
    totalPages: { type: 'integer', example: 10 },
    page: { type: 'integer', example: 1 },
    limit: { type: 'integer', example: 10 },
    hasNextPage: { type: 'boolean', example: true },
    hasPrevPage: { type: 'boolean', example: false },
  },
};
//Swagger Error response schema
export const SWAGGER_ERROR_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    message: { type: 'string', example: 'Error occurred' },
  },
};
// Swagger UI options
export const SWAGGER_UI_OPTIONS = {
  customSiteTitle: 'Node Boilerplate API Documentation',
  customCss: '.swagger-ui .topbar { display: none }',
};
export const VALIDATION_MESSAGE_KEYS = {
  passwordPatternBase: 'string.pattern.base',
  namePatternMaxBase: 'string.max',
  nameRegexBase: 'string.regex.base',
};

export const paginations = {
  ITEM_LIMIT: 50,
  DEFAULT_PAGE: 0,
};
