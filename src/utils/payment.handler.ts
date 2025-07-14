//Third-party modules
import { faker } from '@faker-js/faker';
/**
 * Generates random data for a payment object based on the provided type.
 * @param {string} type - The type of payment object to generate data for.
 * @returns {Record<string, unknown>} - The random data for the payment object.
 * @throws {Error} If the type is not supported.
 */
export const paymentRandomData = (type: string) => {
  switch (type) {
    case 'productCreateRequest':
      return {
        name: { type: 'string', example: 'Pro Plan' },
        description: {
          type: 'string',
          example: 'Great for flexible teams with unlimited features.',
        },
      };
    case 'updateProductWithIdRequest':
      return {
        name: { type: 'string', example: 'Pro Plan' },
        description: {
          type: 'string',
          example: 'Great for flexible teams with unlimited features.',
        },
      };
    case 'priceCreateRequest':
      return {
        productId: { type: 'string', example: 'prod_RPNHqo4aD08irtu' },
        name: { type: 'string', example: 'Pro Plan' },
        currency: { type: 'string', example: 'usd' },
        amount: { type: 'integer', example: '200' },
        description: {
          type: 'string',
          example: 'Great for flexible teams with unlimited features.',
        },
        interval: { type: 'string', example: 'month' },
        usageType: { type: 'string', example: 'metered' },
      };
    case 'updatePriceWithIdRequest':
      return {
        priceId: { type: 'string', example: 'pri_RPNHqo4aD08irtu' },
        name: { type: 'string', example: 'Pro Plan' },
        currency: { type: 'string', example: 'usd' },
        amount: { type: 'integer', example: '200' },
        description: {
          type: 'string',
          example: 'Great for flexible teams with unlimited features.',
        },
      };
    case 'updateCustomerWithIdRequest':
      return {
        email: { type: 'string', example: faker.internet.email() },
        name: { type: 'string', example: 'test' },
      };

    case 'customerCreateRequest':
      return {
        email: { type: 'string', example: faker.internet.email() },
        name: { type: 'string', example: 'test' },
      };
    case 'createPrePaidSubscriptionRequest':
      return {
        customerId: { type: 'string', example: 'cus_ROLETErbpBatRg' },
        priceId: { type: 'string', example: 'price_1QWYC8SDa8BBpScKxc6tvKGs' },
        currency: { type: 'string', example: 'usd' },
        quantity: { type: 'integer', example: 1 },
        usagesType: { type: 'string', example: 'usage_type' },
      };
    case 'createSubscriptionRequest':
      return {
        customerId: { type: 'string', example: 'cus_ROLETErbpBatRg' },
        priceId: { type: 'string', example: 'price_1QWYC8SDa8BBpScKxc6tvKGs' },
        currency: { type: 'string', example: 'usd' },
        trialDays: { type: 'integer', example: 1 },
      };
    case 'updatesubscriptionWithIdRequest':
      return {
        subscriptionId: { type: 'string', example: 'sub_ROLETErbpBatRg' },
        description: { type: 'string', example: 'test sunscription' },
      };
    case 'createOnetTimePaymentRequest':
      return {
        customerId: { type: 'string', example: 'cus_ROLETErbpBatRg' },
        priceId: { type: 'string', example: 'price_1QWYC8SDa8BBpScKxc6tvKGs' },
        currency: { type: 'string', example: 'usd' },
        quantity: { type: 'integer', example: 1 },
      };

    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};
