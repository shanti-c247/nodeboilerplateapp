import { NOT_FOUND, OK, SERVER_ERROR, commonMessages, paymentMessages } from '@constants';
import { stripeService } from '@services';
import type { IPlan, IPlanUpdate, IProduct } from '../types/payment.type';

/**
 * Handles creating a new product
 * @param {IProduct} data - The product data
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
export const addProduct = async (data: IProduct) => {
  try {
    await stripeService.registerProduct(data);
    return {
      status: OK,
      success: true,
      message: paymentMessages.CREATE_PRODUCT,
      data: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Handles get products
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any[]}>}
 */
export const getList = async () => {
  try {
    const productList = await stripeService.searchProduct();
    if (!productList) {
      return {
        status: NOT_FOUND,
        success: false,
        message: paymentMessages.PRODUCT_NOT_FOUND,
        data: null,
      };
    }
    return {
      status: OK,
      success: true,
      message: paymentMessages.GET_PRODUCT_LIST,
      data: productList,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Handles fetching a product by id
 * @param {string} productId - The product id
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
export const getByProductId = async (productId: string) => {
  try {
    const productDoc = await stripeService.fetchProduct(productId);
    if (!productDoc) {
      return {
        status: NOT_FOUND,
        success: false,
        message: paymentMessages.PRODUCT_NOT_FOUND,
        data: null,
      };
    }
    return {
      status: OK,
      success: true,
      message: paymentMessages.GET_PRODUCT,
      data: productDoc,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Handles updating a product
 * @param {IProduct} data - The product data
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
export const updateProductDetails = async (data: IProduct) => {
  try {
    await stripeService.modifyProduct(data);
    return {
      status: OK,
      success: true,
      message: paymentMessages.UPDATE_PRODUCT,
      data: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Handles deleting a product by id
 * @param {string} id - The product id
 * @returns {Promise<{status: number, success: boolean, message: string, data: null}>}
 */

export const deleteByProductId = async (id: string) => {
  try {
    await stripeService.removeProduct(id);
    return {
      status: OK,
      success: true,
      message: paymentMessages.DELETE_PRODUCT,
      data: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Handles creating a new plan
 * @param {IPlan} data - The plan data
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
export const addPrice = async (data: IPlan) => {
  try {
    if (data && data.usageType === 'licensed') {
      await stripeService.createRecurringPlan(data);
    } else if (data && data.usageType === 'metered') {
      await stripeService.createUsagePlan(data);
    } else {
      throw new Error('Provide usageType');
    }
    return {
      status: OK,
      success: true,
      message: paymentMessages.CREATE_PLAN,
      data: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Retrieves a plan by its price ID from the Stripe service.
 * @param {string} priceId - The ID of the price to retrieve the plan for.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */

export const getPlanByPriceId = async (priceId: string) => {
  try {
    const planDetails = await stripeService.getPlanById(priceId);
    if (!planDetails) {
      return {
        status: NOT_FOUND,
        success: false,
        message: paymentMessages.PLAN_NOT_FOUND,
        data: null,
      };
    }
    return {
      status: OK,
      success: true,
      message: paymentMessages.GET_PLAN,
      data: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Updates the price details of a plan using the provided data.
 * @param {IPlanUpdate} data - The plan update data containing details such as description, email, customerId, priceId, and orderId.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null}>}
 */

export const updatePriceDetails = async (data: IPlanUpdate) => {
  try {
    await stripeService.updatePlan(data);
    return {
      status: OK,
      success: true,
      message: paymentMessages.UPDATE_PLAN,
      data: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Creates a new customer in Stripe.
 * @param {string} email - The email address of the new customer.
 * @param {string} name - The name of the new customer.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
export const addCustomer = async (email: string, name: string) => {
  try {
    await stripeService.registerCustomer(email, name);
    return {
      status: OK,
      success: true,
      message: paymentMessages.CREATE_CUSTOMER,
      data: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Fetches a customer by id from Stripe.
 * @param {string} id - The id of the customer to fetch.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | Stripe.Customer}>}
 */
export const getByCustomerId = async (id: string) => {
  try {
    const customer = await stripeService.fetchCustomer(id);
    if (!customer) {
      return {
        status: NOT_FOUND,
        success: false,
        message: paymentMessages.CUSTOMER_NOT_FOUND,
        data: null,
      };
    }
    return {
      status: OK,
      success: true,
      message: paymentMessages.GET_CUSTOMER,
      data: customer,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Updates a customer in Stripe.
 * @param {string} customerId - The id of the customer to update.
 * @param {string} email - The new email address of the customer.
 * @param {string} description - The new description of the customer.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
export const updateCustomerDetails = async (customerId: string, email: string, description: string) => {
  try {
    const priceList = await stripeService.modifyCustomer(customerId, email, description);
    return {
      status: OK,
      success: true,
      message: paymentMessages.UPDATE_CUSTOMER,
      data: priceList,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Deletes a customer from Stripe.
 * @param {string} id - The id of the customer to delete.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */

export const deleteCustomer = async (id: string) => {
  try {
    const priceList = await stripeService.removeCustomer(id);
    return {
      status: OK,
      success: true,
      message: paymentMessages.DELETE_CUSTOMER,
      data: priceList,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Retrieves a list of all available plans from the Stripe service.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any[]}>}
 *  - An object containing the HTTP status code, success flag, message, and a list of plans.
 */

export const getPlanList = async () => {
  try {
    const priceList = await stripeService.getPlans();
    return {
      status: OK,
      success: true,
      message: paymentMessages.GET_PLAN_LIST,
      data: priceList,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Retrieves a subscription by id from Stripe.
 * @param {string} id - The id of the subscription to fetch.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | Stripe.Subscription}>}
 */
export const fetchSubscriptionById = async (id: string) => {
  try {
    const subscriptionDetails = await stripeService.fetchSubscription(id);
    if (!subscriptionDetails) {
      return {
        status: NOT_FOUND,
        success: false,
        message: paymentMessages.CUSTOMER_NOT_FOUND,
        data: null,
      };
    }
    return {
      status: OK,
      success: true,
      message: paymentMessages.GET_SUBSCRIPTION,
      data: subscriptionDetails,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Creates a new subscription with the given customer, price, currency, and trial days.
 * @param {string} customer - The id of the customer to create the subscription for.
 * @param {string} price - The id of the price to use for the subscription.
 * @param {string} currency - The currency of the price.
 * @param {number} trailDays - The number of trial days for the subscription.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null}>}
 */
export const createPostSubscription = async (customer: string, price: string, currency: string, trailDays: number) => {
  try {
    await stripeService.subscriptionService(customer, price, currency, trailDays);
    return {
      status: OK,
      success: true,
      message: paymentMessages.CREATE_SUBSCRIPTION,
      data: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Cancels a subscription by id from Stripe.
 * @param {string} id - The id of the subscription to cancel.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | Stripe.Subscription}>}
 */
export const deleteBysubscriptionId = async (id: string) => {
  try {
    await stripeService.cancelSubscription(id);
    return {
      status: OK,
      success: true,
      message: paymentMessages.DELETE_SUBSCRIPTION,
      data: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Creates a usage based subscription session for a given customer, price and currency.
 * @param {string} customer - The id of the customer to create the subscription for.
 * @param {string} price - The id of the price to use for the subscription.
 * @param {string} currency - The currency to use for the subscription.
 * @returns {Promise<{status: number, success: boolean, message: string, data: {url: string}|null}>}
 */
export const createUsagesSubscriptionSession = async (customer: string, price: string, currency: string) => {
  try {
    const sessionUrl = await stripeService.usageBasedSubscriptionSession(customer, price, currency);
    return {
      status: OK,
      success: true,
      message: paymentMessages.CREATE_SUBSCRIPTION,
      data: { url: sessionUrl },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Creates a prepaid subscription session for a given customer, price and currency.
 * @param {string} customer - The id of the customer to create the subscription for.
 * @param {string} price - The id of the price to use for the subscription.
 * @param {string} currency - The currency to use for the subscription.
 * @param {number} quantity - The number of licenses to purchase.
 * @returns {Promise<{status: number, success: boolean, message: string, data: {url: string}|null}>}
 */
export const prePaymentSubcriptionSession = async (
  customer: string,
  price: string,
  currency: string,
  quantity: number,
) => {
  try {
    const sessionUrl = await stripeService.prePaidSubscriptionSession(customer, price, currency, quantity);
    return {
      status: OK,
      success: true,
      message: paymentMessages.CREATE_SUBSCRIPTION,
      data: { url: sessionUrl },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Updates a prepaid subscription by given subscriptionId and description.
 * @param {string} subscriptionId - The id of the subscription to update.
 * @param {string} description - The description for the subscription.
 * @returns {Promise<{status: number, success: boolean, message: string, data: {url: string}|null}>}
 */
export const updatePrepaidSubscription = async (subscriptionId: string, description: string) => {
  try {
    const sessionUrl = await stripeService.updatePrepaidTypeSubscription(subscriptionId, description);
    return {
      status: OK,
      success: true,
      message: paymentMessages.UPDATE_SUBSCRIPTION,
      data: { url: sessionUrl },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Process one time payment.
 * @param {string} customer - The id of the customer to charge.
 * @param {string} price - The id of the price to use for the one time payment.
 * @param {string} currency - The currency to use for the one time payment.
 * @param {number} quantity - The number of licenses to purchase.
 * @returns {Promise<{status: number, success: boolean, message: string, data: {url: string}|null}>}
 */
export const onetimeProcess = async (customer: string, price: string, currency: string, quantity: number) => {
  try {
    const sessionUrl = await stripeService.oneTimePayment(customer, price, currency, quantity);
    return {
      status: OK,
      success: true,
      message: paymentMessages.ONE_TIME_PAYMENT,
      data: { url: sessionUrl },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;

    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};
