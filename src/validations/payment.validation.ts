//Third-party modules
import Joi from 'joi';

// product
export const createProductionValidator = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(null).allow(''),
  }),
};
export const updateProductionValidator = {
  body: Joi.object({
    name: Joi.string().optional().allow(null).allow(''),
    description: Joi.string().optional().allow(null).allow(''),
  }),
};

// price/plan
export const createPriceValidator = {
  body: Joi.object({
    priceId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().optional().allow(null).allow(''),
    currency: Joi.string().required(),
    amount: Joi.number().required(),
    interval: Joi.string().valid('day', 'week', 'month', 'year').required(), // Interval validation
    usageType: Joi.string().valid('metered', 'licensed').required(),
  }),
};
export const updatePriceValidator = {
  body: Joi.object({
    priceId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().optional().allow(null).allow(''),
    currency: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

// Customer
export const createCustomerValidator = {
  body: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    description: Joi.string().optional().allow(null).allow(''),
  }),
};
export const updateCustomerValidator = {
  body: Joi.object({
    customerId: Joi.string().email().required(),
    email: Joi.string().email().allow(null),
    name: Joi.string().optional().allow(null).allow(''),
    description: Joi.string().optional().allow(null).allow(''),
  }),
};

// Recurring Subscription (prepayment)
export const createSubscriptionValidator = {
  body: Joi.object({
    customerId: Joi.string().required(),
    priceId: Joi.string().required(),
    currency: Joi.string().required(),
    trialDays: Joi.number().required(),
  }),
};
export const updateSubscriptionValidator = {
  body: Joi.object({
    subscriptionId: Joi.string().optional().allow(null).allow(''),
    description: Joi.string().optional().allow(null).allow(''),
    quantity: Joi.number().optional().allow(null).allow(''),
  }),
};

// Recurring Subscription (postpayment)
export const createUsageSubscriptionValidator = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(null).allow(''),
  }),
};
export const updateUsageSubscriptionValidator = {
  body: Joi.object({
    name: Joi.string().optional().allow(null).allow(''),
    description: Joi.string().optional().allow(null).allow(''),
  }),
};

// one time payment
export const createOneTimePaymentValidator = {
  body: Joi.object({
    customerId: Joi.string().required(),
    priceId: Joi.string().required(),
    currency: Joi.string().required(),
    quantity: Joi.number().optional(),
  }),
};
