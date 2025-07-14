import { NotificationType } from '@enums';
import Joi from 'joi';

export const getNotificationListSchema = {
  query: Joi.object({
    type: Joi.string()
      .valid(...Object.values(NotificationType))
      .optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    page: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
  }),
};
