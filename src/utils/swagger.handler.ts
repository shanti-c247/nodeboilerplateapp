// config
import env from '@config/envVar';

// Utils
import { commonHandler } from '@utils';

// Constants
import { commonMessages, commonVariables } from '@constants';

/**
 * A swagger response object for successful responses
 * @param {string} message the message to be included in the response
 * @param {object | null} dataSchema the schema for the data returned in the response
 * @returns {object} a swagger response object with the description set to the message and the schema set to {success: boolean, message: string, data: dataSchema}
 */
export const createSuccessResponse = (message: string, dataSchema: object | null) => ({
  description: message,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: message },
          data: dataSchema,
        },
      },
    },
  },
});

/**
 * A swagger response object for list responses
 * @param {object} itemSchema the schema of the items in the list
 * @param {string} message the message to be included in the response
 * @param {boolean} [includePagination] whether to include pagination metadata in the response
 * @returns {object} a swagger response object with the description set to the message and the schema set to {success: boolean, message: string, data: {items: itemSchema[], pagination: PaginationMeta}}
 */
export const createListResponse = (itemSchema: object, message: string, includePagination?: boolean) => ({
  type: 'object',
  properties: {
    success: { type: 'boolean', example: true },
    message: { type: 'string', example: message },
    data: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: itemSchema,
        },
        pagination: includePagination ? { $ref: '#/components/schemas/PaginationMeta' } : null,
      },
    },
  },
});

/**
 * A swagger response object for error responses
 * @param {string} message the message to be included in the response
 * @returns {object} a swagger response object with the description set to the message and the schema set to {success: boolean, message: string}
 */

export const createErrorResponse = (message: string) => ({
  description: message,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: message },
        },
      },
    },
  },
});

export const STANDARD_ERROR_RESPONSES = {
  BadRequest: createErrorResponse(commonMessages.BAD_REQUEST_ERROR_MESSAGE),
  UnprocessableEntity: createErrorResponse(commonMessages.UNPROCESSABLE_ENTITY_ERROR_MESSAGE),
  Unauthorized: createErrorResponse(commonMessages.UNAUTHORIZED),
  Forbidden: createErrorResponse(commonMessages.FORBIDDEN_ERROR),
  NotFound: createErrorResponse(commonMessages.RESOURCE_NOT_FOUND),
  Conflict: createErrorResponse(commonMessages.CONFLICT_ERROR),
  InternalServerError: createErrorResponse(commonMessages.INTERNAL_SERVER_ERROR),
};

/**
 * Generates a Swagger configuration object.
 *
 * @param {Object} options - Configuration options for Swagger.
 * @param {string} [options.title] - The title of the API documentation.
 * @param {string} [options.version] - The version of the API.
 * @param {string} [options.description] - A description of the API.
 * @param {string[]} [options.routes] - An array of route paths to include in the documentation.
 * @param {Object[]} [options.tags] - An array of tag objects, each with a name and description.
 * @param {Record<string, object>} [options.additionalSchemas] - Additional schemas to include in the API components.
 * @param {Record<string, object>} [options.additionalResponses] - Additional responses to include in the API components.
 * @returns {Object} The Swagger configuration object, including definition and API paths.
 */

export const createSwaggerConfig = (options: {
  title?: string;
  version?: string;
  description?: string;
  routes?: string[];
  tags?: { name: string; description: string }[];
  additionalSchemas?: Record<string, object>;
  additionalResponses?: Record<string, object>;
}) => {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: options.title || 'API Documentation Of Node Boilerplate',
      version: options.version || '1.0.0',
      description: options.description || 'These are the RESTful APIs built with Node.js, Express.js.',
    },
    servers: [
      {
        url: `${env.API_URL}`,
      },
    ],
    tags: options.tags,
    //  || [
    //   {
    //     name: 'Auth',
    //     description: 'Operations related to authentication',
    //   },
    //   { name: 'Users', description: 'Operations related to user management' },
    //   {
    //     name: 'Data Management',
    //     description: 'Operations related to data management',
    //   },
    //   {
    //     name: 'Payment',
    //     description: 'Operations related to payment',
    //   },
    //   {
    //     name: 'Notifications',
    //     description: 'Operations related to notification',
    //   },
    // ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ErrorResponse: commonVariables.SWAGGER_ERROR_RESPONSE_SCHEMA,
        PaginationMeta: commonVariables.PAGINATION_META_SCHEMA,
        ...options.additionalSchemas,
      },
      responses: {
        ...STANDARD_ERROR_RESPONSES,
        ...options.additionalResponses,
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  };

  return {
    swaggerDefinition,
    apis:
      options.routes ||
      (commonHandler.isLogger ? ['src/modules/users/routes/index.ts'] : ['dist/modules/users/routes/index.js']),
  };
};
