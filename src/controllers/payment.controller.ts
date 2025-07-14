//Third-party modules
import type { NextFunction, Request, Response } from 'express';

//Middlewares
import { responseHandler } from '@middlewares';

//Constants
import { OK, paymentMessages } from '@constants';

//Utils
import { ErrorHandler, catchHandler } from '@utils';

//Services

import { paymentService, stripeService } from '@services';

/**
 * Handles creating a new product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.addProduct(req.body);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};
/**
 * Handles get products
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getProductList = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.getList();

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};
/**
 * Handles get product by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.getByProductId(req.params.productId);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};
/**
 * Handles update product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.updateProductDetails(req.body);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};
/**
 * Handles delete product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.deleteByProductId(req.params.proDUCTID);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles creating a new price
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createPrice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.addPrice(req.body);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles Get price
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getPriceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.getPlanByPriceId(req.params.priceId);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles update a price
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updatePrice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.updatePriceDetails(req.body);
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles creating a new customer
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, name } = req.body;
    const { status, success, message, data } = await paymentService.addCustomer(email, name);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles get customer by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getCustomerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.getByCustomerId(req.params.customerId);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};
/**
 * Handles update customer
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updateCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.updateCustomerDetails(
      req.body.customerId,
      req.body.email,
      req.body.description,
    );
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};
/**
 * Handles delete customer
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const deleteCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.deleteCustomer(req.params.customerId);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles pre paid subscription session
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createPrePaymentSubcriptionSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { customerId, priceId, currency, quantity } = req.body;
    const { status, success, message, data } = await paymentService.prePaymentSubcriptionSession(
      customerId,
      priceId,
      currency,
      quantity,
    );

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles post paid subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createPostPaymentSubcription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { customerId, priceId, currency, trialDays } = req.body;
    const { status, success, message, data } = await paymentService.createPostSubscription(
      customerId,
      priceId,
      currency,
      trialDays,
    );

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles get subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getSubcriptionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.fetchSubscriptionById(req.params.subscriptionId);
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles get subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const deleteSubcriptionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.deleteBysubscriptionId(req.params.subscriptionId);
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles update subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updateSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { subscriptionId, discription } = req.body;
    const { status, success, message, data } = await paymentService.updatePrepaidSubscription(
      subscriptionId,
      discription,
    );

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles create usages subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createPostPaidSubscriptionSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { status, success, message, data } = await paymentService.createUsagesSubscriptionSession(
      req.params.customerId,
      req.body.priceId,
      req.body.currency,
    );

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles get subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const oneTimePaymentProcess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { customer, price, currency, quantity } = req.body;
    const { status, success, message, data } = await paymentService.onetimeProcess(customer, price, currency, quantity);
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles get webhooks
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const paymentWebhooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await stripeService.webhookService(req);
    responseHandler(res, paymentMessages.WEBHOOK_CALL, OK, null);
  } catch (error) {
    catchHandler(error, next);
  }
};
