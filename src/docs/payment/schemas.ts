import { paymentHandler } from '@utils';

const paymentSchemas = {
  // create product
  ProductCreateRequest: {
    type: 'object',
    required: ['name', 'discription'],
    properties: paymentHandler.paymentRandomData('productCreateRequest'),
  },

  // update product Request
  UpdateProductWithIdRequest: {
    properties: paymentHandler.paymentRandomData('updateProductWithIdRequest'),
  },

  // create plan
  PriceCreateRequest: {
    type: 'object',
    properties: paymentHandler.paymentRandomData('priceCreateRequest'),
  },

  // update plan Request
  UpdatePriceWithIdRequest: {
    properties: paymentHandler.paymentRandomData('updatePriceWithIdRequest'),
  },

  // create customer
  CustomerCreateRequest: {
    type: 'object',
    properties: paymentHandler.paymentRandomData('customerCreateRequest'),
  },

  // update customer Request
  UpdateCustomerWithIdRequest: {
    properties: paymentHandler.paymentRandomData('updateCustomerWithIdRequest'),
  },
  CreatePrePaidSubscriptionRequest: {
    type: 'object',
    properties: paymentHandler.paymentRandomData('createPrePaidSubscriptionRequest'),
  },

  // update customer Request
  CreateOnetTimePaymentRequest: {
    properties: paymentHandler.paymentRandomData('createOnetTimePaymentRequest'),
  },
  CreateSubscriptionRequest: {
    type: 'object',
    properties: paymentHandler.paymentRandomData('createSubscriptionRequest'),
  },

  UpdatesubscriptionWithIdRequest: {
    type: 'object',
    properties: paymentHandler.paymentRandomData('updatesubscriptionWithIdRequest'),
  },
};

export default paymentSchemas;
