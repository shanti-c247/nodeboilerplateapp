import env from '@config/envVar';
import { logger } from '@config/logger';
import { BAD_REQUEST, NOT_FOUND } from '@constants';
import type { ICustomError } from '@customTypes';
import Stripe from 'stripe';
import type { IPlan, IPlanUpdate, IProduct } from '../types/payment.type';
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

/**
 * Registers a product on Stripe
 * @param data - The product data
 * @returns The Stripe product ID
 * @throws Error
 */
export const registerProduct = async (data: IProduct) => {
  /** Create a product on Stripe */
  try {
    const product = await stripe.products.create({
      name: data.name,
      description: data.description,
      // Add other optional fields as needed
    });
    return product.id;
  } catch (err) {
    const error = err instanceof Error;
    throw error;
  }
};

/**
 * Updates a product on Stripe
 * @param data - The product data containing the product ID and details to update
 * @returns The updated Stripe product object
 * @throws Error if the update operation fails
 */
export const modifyProduct = async (data: IProduct) => {
  try {
    // update product details on stripe...
    return await stripe.products.update(data.productId, {
      name: data.name,
      description: data.description,
    });
  } catch (err) {
    const error = err instanceof Error;
    throw error;
  }
};

/**
 * Retrieves a product from Stripe
 * @param productId - The product ID
 * @returns The Stripe product object
 * @throws Error if the retrieval operation fails
 */
export const fetchProduct = async (productId: string) => {
  try {
    // get particular product on stripe... productId=price_1MoBy5LkdIwHu7ixZhnattss
    return await stripe.products.retrieve(productId);
  } catch (error) {
    const err = error as ICustomError;
    if (err && err.statusCode === NOT_FOUND) {
      return null;
    }
    throw err;
  }
};

/**
 * Deletes a product on Stripe
 * @param productId - The product ID
 * @returns A Stripe response object
 * @throws Error if the deletion operation fails
 */
export const removeProduct = async (productId: string) => {
  try {
    /** search price based on filter */
    return await stripe.products.del(productId);
  } catch (err) {
    const error = err instanceof Error;
    throw error;
  }
};

/**
 * Searches for active products on Stripe
 * @returns A Stripe search response object containing a list of products
 * @throws Error if the search operation fails
 */
export const searchProduct = async () => {
  try {
    /** search price based on filter */
    return await stripe.products.search({
      query: `active:'true'`,
    });
  } catch (error) {
    const err = error as ICustomError;
    if ((err && err.statusCode === NOT_FOUND) || err.statusCode === BAD_REQUEST) {
      return null;
    }
    throw err;
  }
};

/**
 * Creates a new recurring plan on Stripe.
 * @param {IPlan} data - The plan data with productId, currency, amount and interval.
 * @returns {Promise<string>} - The plan ID.
 * @throws Error if the creation operation fails.
 */
export const createRecurringPlan = async (data: IPlan) => {
  /** Create a plan on Stripe */
  try {
    const prices = await stripe.prices.create({
      currency: data.currency, // change on requirement
      unit_amount: data.amount, // Amount in cents (1000 cents = $10.00)
      product: data.productId, // product Id of stripe //prod_Pws9PxtPpNXQwe
      recurring: {
        interval: data.interval, // For subscription pricing exm. : year/month
      },
    });
    return prices.id;
  } catch (err) {
    const error = err instanceof Error;
    throw error;
  }
};

/**
 * Creates a new usage-based plan on Stripe.
 * @param {IPlan} data - The plan data with productId, currency, amount, interval and usageType.
 * @returns {Promise<string>} - The plan ID.
 * @throws Error if the creation operation fails.
 */
export const createUsagePlan = async (data: IPlan) => {
  /** Create a plan on Stripe */
  try {
    const prices = await stripe.prices.create({
      currency: data.currency, // change on requirement
      unit_amount: data.amount, // Amount in cents (1000 cents = $10.00)
      product: data.productId, // product Id of stripe //prod_Pws9PxtPpNXQwe
      recurring: {
        interval: data.interval, // or 'year'
        usage_type: data.usageType, // 'metered' or 'licensed'
      },
    });
    return prices.id;
  } catch (err) {
    const error = err instanceof Error;
    throw error;
  }
};

/**
 * Creates a new one-time plan on Stripe.
 * @param {IPlan} data - The plan data with productId, currency, and amount.
 * @returns {Promise<string>} - The plan ID.
 * @throws Error if the creation operation fails.
 */
export const createOneTimePlan = async (data: IPlan) => {
  /** Create a plan on Stripe */
  try {
    const prices = await stripe.prices.create({
      currency: data.currency, // change on requirement
      unit_amount: data.amount, // Amount in cents (1000 cents = $10.00)
      product: data.productId, // product Id of stripe //prod_Pws9PxtPpNXQwe
    });
    return prices.id;
  } catch (err) {
    const error = err instanceof Error;
    throw error;
  }
};

/**
 * Updates a plan on Stripe with the provided data.
 * @param {IPlanUpdate} data - The plan update data containing priceId, description, and other optional details.
 * @returns {Promise<object>} - The updated Stripe price object.
 * @throws Error if the update operation fails.
 */

export const updatePlan = async (data: IPlanUpdate) => {
  try {
    // update plan details on stripe...
    return await stripe.prices.update(data.priceId, {
      nickname: data.description,
      metadata: {
        //
      },
      active: true, // set false for archive the price
    });
  } catch (err) {
    const error = err instanceof Error;
    throw error;
  }
};

/**
 * Retrieves a plan by its priceId from the Stripe service.
 * @param {string} priceId - The ID of the price to retrieve the plan for.
 * @returns {Promise<{id: string, object: string, active: boolean, billing_scheme: string, currency: string, lookup_key: string | null, livemode: boolean, metadata: object, nickname: string | null, product: string, recurring: {interval: string, usage_type: string}, tiers: {currency: string, up_to: number, unit_amount: number}[], tiers_mode: string, transform_quantity: {divide_by: number, round: string}, type: string, unit_amount: number, unit_amount_decimal: string}>}
 *  - The Stripe price object.
 * @throws Error if the retrieval operation fails.
 */
export const getPlanById = async (priceId: string) => {
  try {
    // get particular plan on stripe... priceId=price_1MoBy5LkdIwHu7ixZhnattss
    return await stripe.prices.retrieve(priceId);
  } catch (error) {
    const err = error as ICustomError;
    if (err && err.statusCode === NOT_FOUND) {
      return null;
    }
    throw err;
  }
};

/**
 * Retrieves a list of all available plans from the Stripe service.
 * @returns {Promise<{data: {id: string, object: string, active: boolean, billing_scheme: string, currency: string, lookup_key: string | null, livemode: boolean, metadata: object, nickname: string | null, product: string, recurring: {interval: string, usage_type: string}, tiers: {currency: string, up_to: number, unit_amount: number}[], tiers_mode: string, transform_quantity: {divide_by: number, round: string}, type: string, unit_amount: number, unit_amount_decimal: string}[], has_more: boolean, url: string}>}
 *  - An object containing the HTTP status code, success flag, message, and a list of plans.
 * @throws Error if the retrieval operation fails.
 */
export const getPlans = async () => {
  try {
    /** search price based on filter */
    return await stripe.prices.list({
      limit: 3,
    });
  } catch (err) {
    const error = err instanceof Error;
    throw error;
  }
};

/**
 * Creates a new customer in Stripe for managing plans and payments.
 * @param {string} email - The email address of the new customer.
 * @param {string} name - The name of the new customer.
 * @returns {Promise<{id: string, object: string, address: object | null, balance: number, created: number, currency: string | null, delinquent: boolean, description: string | null, discount: object | null, email: string, invoice_prefix: string, livemode: boolean, metadata: object, name: string | null, phone: string | null, shipping: object | null, tax_exempt: string | null}>}
 *  - The Stripe customer object.
 * @throws Error if the creation operation fails.
 */
export const registerCustomer = async (email: string, name: string) => {
  /** Create a customer on Stripe for managing plans and payments */
  try {
    return await stripe.customers.create({
      name,
      email, // set other details like address,description metadata etc
    });
  } catch (err) {
    const error = err instanceof Error;
    logger.error(`konoo ${error}`);
    throw error;
  }
};

/**
 * Updates a customer in Stripe.
 * @param {string} customerId - The id of the customer to update.
 * @param {string} email - The new email address of the customer.
 * @param {string} description - The new description of the customer.
 * @returns {Promise<{id: string, object: string, address: object | null, balance: number, created: number, currency: string | null, delinquent: boolean, description: string | null, discount: object | null, email: string, invoice_prefix: string, livemode: boolean, metadata: object, name: string | null, phone: string | null, shipping: object | null, tax_exempt: string | null}>}
 *  - The Stripe customer object.
 * @throws Error if the update operation fails.
 */
export const modifyCustomer = async (customerId: string, email: string, description: string) => {
  try {
    // update customer details on stripe...
    return await stripe.customers.update(
      customerId, //here the customer id is unique key for update data on stripe
      {
        email: email,
        description: description,
        //... update other info based on your requirement like:-  name , phone,address etc..,
      },
    );
  } catch (err) {
    const error = err instanceof Error;
    throw error;
  }
};

/**
 * Deletes a customer from Stripe.
 * @param {string} customerId - The id of the customer to delete.
 * @returns {Promise<{id: string, object: string, deleted: boolean}>}
 *  - An object indicating whether the customer was successfully deleted.
 * @throws Error if the deletion operation fails.
 */
export const removeCustomer = async (customerId: string) => {
  try {
    // delete particular customer on stripe... i.e.: customerId=cus_NffrFeUfNV2Hib
    return await stripe.customers.del(customerId);
  } catch (err) {
    const error = err instanceof Error;
    throw error;
  }
};

/**
 * Retrieves a customer by id from Stripe.
 * @param {string} customerId - The id of the customer to fetch.
 * @returns {Promise<{id: string, object: string, address: object | null, balance: number, created: number, currency: string | null, delinquent: boolean, description: string | null, discount: object | null, email: string, invoice_prefix: string, livemode: boolean, metadata: object, name: string | null, phone: string | null, shipping: object | null, tax_exempt: string | null}>}
 *  - The Stripe customer object.
 * @throws Error if the retrieval operation fails.
 */
export const fetchCustomer = async (customerId: string) => {
  try {
    // delete particular customer on stripe... customerId=cus_NffrFeUfNV2Hib
    return await stripe.customers.retrieve(customerId);
  } catch (error) {
    const err = error as ICustomError;
    if (err && err.statusCode === NOT_FOUND) {
      return null;
    }
    throw err;
  }
};

/**
 * Creates a one time payment session for a given customer, price, currency, and quantity.
 * @param {string} customer - The id of the customer to create the session for.
 * @param {string} price - The id of the price to use for the session.
 * @param {string} currency - The currency to use for the session.
 * @param {number} quantity - The number of licenses to purchase.
 * @returns {Promise<string>} The URL of the checkout session.
 * @throws {Error} If the session creation fails.
 */
export const oneTimePayment = async (customer: string, price: string, currency: string, quantity: number) => {
  let session = null;
  try {
    //create one time payment checkout session
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'], // set multiple method if need like ["card"]
      customer,
      line_items: [
        {
          price,
          quantity: quantity,
        },
      ],
      currency: `${currency}`, // Set the currency for which the checkout session is to be created
      metadata: {
        //set metadata for access inside hook
        price: price,
        type: 'one-time',
      },
      success_url: env.CORS_ORIGIN, // set redirect user after subscritopn process is successfully done
      cancel_url: env.CORS_ORIGIN, // set redirect user after subscritopn  cancel
    });
  } catch (error) {
    logger.error(`Failed to create One time payment of StripeCustomerId: ${customer} ${error}`);
    throw new Error(`Failed to create One time payment of customer : ${customer}`);
  }
  return session.url;
};

/**
 * Creates a pre paid subscription session for a given customer, price, currency, and quantity.
 * @param {string} customer - The id of the customer to create the session for.
 * @param {string} price - The id of the price to use for the session.
 * @param {string} currency - The currency to use for the session.
 * @param {number} quantity - The number of licenses to purchase.
 * @returns {Promise<string>} The URL of the checkout session.
 * @throws {Error} If the session creation fails.
 */
export const prePaidSubscriptionSession = async (
  customer: string,
  price: string,
  currency: string,
  quantity: number,
) => {
  let session = null;
  try {
    // create subscription by using stripe checkout page
    quantity = quantity ? quantity : 1; // if quantity not passed set default value
    session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer,
      line_items: [
        {
          price: price,
          quantity: quantity,
        },
      ],
      metadata: {
        usage_type: 'licensed',
        price: price,
      },
      payment_method_collection: 'if_required', // The Checkout Session will only collect a PaymentMethod if there is an amount due.
      currency: `${currency}`, // Set the currency for which the checkout session is to be created
      success_url: `${env.CORS_ORIGIN}/home`, // set redirect user after subscritopn process is successfully done
      cancel_url: `${env.CORS_ORIGIN}/home`, // set redirect user after subscritopn  cancel
    });
  } catch (err) {
    const error = err instanceof Error;
    logger.error(`failed when create subscription of customer : ${error}`);
    throw error;
  }
  return session.url;
};

/**
 * Creates a subscription by using stripe without create checkout page.
 * @param {string} customerId - The id of the customer to create the subscription for.
 * @param {string} price - The id of the price to use for the subscription.
 * @param {string} currency - The currency to use for the subscription.
 * @param {number} trailDays - The number of trial days for the subscription.
 * @returns {Promise<Stripe.Subscription>} The created subscription.
 * @throws {Error} If the subscription creation fails.
 */
export const subscriptionService = async (customerId: string, price: string, currency: string, trailDays: number) => {
  try {
    // create subscription by  using stripe without create checkout page
    return await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: price }],
      trial_period_days: trailDays, // set trial based on needs
      currency: `${currency}`,
      metadata: {
        /**set metadata for webhook optrations */
        usage_type: 'licensed', //fixed price plan
        price: price,
      },
      collection_method: 'charge_automatically', // Charge automatically for the subscription
      trial_settings: {
        //trial plan settinge cancel if card/payment method not attched
        end_behavior: {
          missing_payment_method: 'cancel',
        },
      },
    });
  } catch (err) {
    const error = err instanceof Error;
    logger.error(`failed when create subscription of customer : ${error}`);
    throw error;
  }
};

/**
 * Creates a pay as you go subscription session for a given customer, price and currency.
 * @param {string} customer - The id of the customer to create the subscription for.
 * @param {string} price - The id of the price to use for the subscription.
 * @param {string} currency - The currency to use for the subscription.
 * @returns {Promise<string>} The URL of the checkout session.
 * @throws {Error} If the session creation fails.
 */
export const usageBasedSubscriptionSession = async (customer: string, price: string, currency: string) => {
  let session = null;
  try {
    // this based on pay as you go plan means pay only usages
    session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer,
      line_items: [
        {
          price, //for usages type not need to padd quantity
        },
      ],
      metadata: {
        usage_type: 'licensed',
        price: price,
      },
      payment_method_collection: 'if_required',
      currency: `${currency}`, // Set the currency for which the checkout session is to be created
      success_url: `${env.CORS_ORIGIN}/home`, // set redirect user after subscritopn process is successfully done
      cancel_url: `${env.CORS_ORIGIN}/home`, // set redirect user after subscritopn  cancel
    });
  } catch (err) {
    const error = err instanceof Error;
    logger.error(`failed when create pay as you go plan  of customer : ${error}`);

    throw error;
  }
  return session.url; //if need also return session id
};

/**
 * Retrieves a subscription by id from Stripe.
 * @param {string} subscriptionId - The id of the subscription to fetch.
 * @returns {Promise<Stripe.Subscription>} The fetched subscription.
 * @throws {Error} If the fetch operation fails.
 */
export const fetchSubscription = async (subscriptionId: string) => {
  try {
    // delete particular customer on stripe... customerId=cus_NffrFeUfNV2Hib
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    const err = error as ICustomError;
    if (err && err.statusCode === NOT_FOUND) {
      return null;
    }
    throw err;
  }
};

/**
 * Updates a prepaid subscription by given subscriptionId and description.
 * @param {string} subscriptionId - The id of the subscription to update.
 * @param {string} description - The description for the subscription.
 * @returns {Promise<void>}
 * @throws {Error} If the update operation fails.
 */
export const updatePrepaidTypeSubscription = async (subscriptionId: string, description: string) => {
  try {
    await stripe.subscriptions.update(subscriptionId, {
      description: description,
      metadata: {
        order_id: '6735', //this is a exmaple
      },
    });
  } catch (err) {
    const error = err instanceof Error;
    logger.error(`failed when update pay as you go plan : ${error}`);
    throw error;
  }
  return;
};

/**
 * Cancels an active subscription by its ID.
 * @param {string} subscriptionId - The id of the subscription to cancel.
 * @returns {Promise<Stripe.Subscription>} The canceled subscription.
 * @throws {Error} If the cancel operation fails.
 */
export const cancelSubscription = async (subscriptionId: string) => {
  try {
    // cancel any active subscription
    return await stripe.subscriptions.cancel(subscriptionId);
  } catch (err) {
    const error = err instanceof Error;
    logger.error(`Error canceling subscription: : ${error}`);
    throw error;
  }
};

/**
 * Handles Stripe webhook events.
 *
 * @param {Request} req - The request data.
 *
 * @throws {Error} If the event handling fails.
 */
export const webhookService = async (req: any) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = env.STRIPE_WEBHOOK_SECRET; // set token for access stripe webhook
  let event: any;
  try {
    // get data and
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    logger.error(`stripe webhook error:${err}`);
    throw err;
  }
  const data = event.data.object; // stripe event data for perform other task like update details in db etc.
  logger.info(`stripe webhook matadata: ${data}`);
  logger.info(`event name:${event.type}`);
  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created': {
      /**
       * Perform the operation after create the subscription.
       */
      break;
    }

    case 'customer.subscription.updated': {
      /**
       * Perform the operation after update the subscription.
       */
      break;
    }

    case 'checkout.session.completed': {
      // when checkout is completed allow user , save and update data after payment event completed

      break;
    }

    case 'customer.subscription.deleted': {
      /**
       * Perform the operation after deleting/canceling the subscription.
       */

      break;
    }

    // invoice.payment_succeeded update price after payment succeed
    case 'invoice.payment_succeeded': {
      /**
       * Perform the operation after payment succed.
       */
      break;
    }

    case 'invoice.paid': {
      /**
       * Perform the operation after invoice status=paid.
       */
      break;
    }

    case 'invoice.upcoming': {
      /**
       * Perform the operation for check next invoice of the subscription.
       */
      break;
    }

    default:
      break;
  }
};
