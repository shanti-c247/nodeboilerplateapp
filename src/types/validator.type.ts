import type { Request } from 'express';
import type Joi from 'joi';

export type ValidationSchemaKeys = 'params' | 'query' | 'body';

export interface ValidationSchemas {
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  body?: Joi.ObjectSchema;
}

export interface ValidationSchemasKey extends Request {
  key: Request | string;
}
