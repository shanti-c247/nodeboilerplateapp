// constants
import { paymentMessages } from '@constants';

// utils
import { swaggerHandler } from '@utils';

const authResponses = {
  ProductCreated: swaggerHandler.createSuccessResponse(paymentMessages.CREATE_PRODUCT, {
    $ref: '#/components/schemas/Payment',
  }),
  GetProductResponse: swaggerHandler.createSuccessResponse(paymentMessages.GET_PRODUCT_LIST, {
    $ref: '#/components/schemas/Payment',
  }),
  GetProductWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.GET_PRODUCT, {
    $ref: '#/components/schemas/Payment',
  }),
  UpdateProductWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.UPDATE_PRODUCT, {
    $ref: '#/components/schemas/Payment',
  }),

  DeleteProductWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.UPDATE_PRODUCT, {
    $ref: '#/components/schemas/Payment',
  }),

  PriceCreated: swaggerHandler.createSuccessResponse(paymentMessages.CREATE_PLAN, {
    $ref: '#/components/schemas/Payment',
  }),
  GetPriceWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.GET_PLAN, {
    $ref: '#/components/schemas/Payment',
  }),
  UpdatePriceWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.UPDATE_PLAN, {
    $ref: '#/components/schemas/Payment',
  }),
  DeletePriceWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.UPDATE_PLAN, {
    $ref: '#/components/schemas/Payment',
  }),

  CustomerCreated: swaggerHandler.createSuccessResponse(paymentMessages.CREATE_CUSTOMER, {
    $ref: '#/components/schemas/Payment',
  }),
  GetCustomerWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.GET_CUSTOMER, {
    $ref: '#/components/schemas/Payment',
  }),
  UpdateCustomerWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.UPDATE_CUSTOMER, {
    $ref: '#/components/schemas/Payment',
  }),
  DeleteCustomerWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.DELETE_CUSTOMER, {
    $ref: '#/components/schemas/Payment',
  }),

  CreateUsageSubscriptionResponse: swaggerHandler.createSuccessResponse(paymentMessages.CREATE_SUBSCRIPTION, {
    $ref: '#/components/schemas/Payment',
  }),
  CreatePrePaidSubscriptionResponse: swaggerHandler.createSuccessResponse(paymentMessages.CREATE_SUBSCRIPTION, {
    $ref: '#/components/schemas/Payment',
  }),
  CreateSubscriptionResponse: swaggerHandler.createSuccessResponse(paymentMessages.CREATE_SUBSCRIPTION, {
    $ref: '#/components/schemas/Payment',
  }),

  UpdatesubscriptionWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.UPDATE_SUBSCRIPTION, {
    $ref: '#/components/schemas/Payment',
  }),

  CreateOneTimePaymentResponse: swaggerHandler.createSuccessResponse(paymentMessages.ONE_TIME_PAYMENT, {
    $ref: '#/components/schemas/Payment',
  }),
  GetsubscriptionWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.GET_SUBSCRIPTION, {
    $ref: '#/components/schemas/Payment',
  }),
  DeletesubscriptionWithIdResponse: swaggerHandler.createSuccessResponse(paymentMessages.DELETE_SUBSCRIPTION, {
    $ref: '#/components/schemas/Payment',
  }),
};

export default authResponses;
