//Controllers
import { paymentController } from '@controllers';
//Enums
import { Role } from '@enums';
//Middlewares
import { authenticate, authorize, validate } from '@middlewares';
//Validations
import { paymentValidations } from '@validations';
//Third-party modules
import { Router } from 'express';

const router = Router();

// Stripe product related routes
router.post(
  '/product',
  authenticate,
  authorize(Role.Admin),
  validate(paymentValidations.createProductionValidator),
  paymentController.createProduct,
);

router.get('/product/list', authenticate, authorize(Role.Admin), paymentController.getProductList);
router.delete('/product/:productId', authenticate, authorize(Role.Admin), paymentController.deleteProduct);
router.get('/product/:productId', authenticate, authorize(Role.Admin), paymentController.getProductById);

router.put(
  '/product/:productId',
  authenticate,
  authorize(Role.Admin),
  validate(paymentValidations.updateProductionValidator),
  paymentController.updateProduct,
);

// Stripe plan related routes
router.post(
  '/plan',
  authenticate,
  authorize(Role.Admin),
  validate(paymentValidations.createPriceValidator),
  paymentController.createPrice,
);

router.get('/plan/:priceId', authenticate, authorize(Role.Admin), paymentController.getPriceById);

router.put(
  '/plan',
  authenticate,
  authorize(Role.Admin),
  validate(paymentValidations.updatePriceValidator),
  paymentController.updatePrice,
);

// create customer Related routes
router.post(
  '/customer/create',
  authenticate,
  authorize(Role.User),
  validate(paymentValidations.createCustomerValidator),
  paymentController.createCustomer,
);
router.get('/customer/:customerId', authenticate, authorize(Role.User), paymentController.getCustomerById);

router.delete('/customer/:customerId', authenticate, authorize(Role.User), paymentController.deleteCustomer);

router.put(
  '/customer',
  authenticate,
  authorize(Role.User),
  validate(paymentValidations.updateCustomerValidator),
  paymentController.updateCustomer,
);

// Stripe subscription related routes
// post (usage) paid
router.post(
  '/subscription/usage/session',
  authenticate,
  authorize(Role.User),
  validate(paymentValidations.createSubscriptionValidator),
  paymentController.createPostPaidSubscriptionSession,
);

// pre paid
router.post(
  '/subscription/pre-paid/session',
  authenticate,
  authorize(Role.User),
  validate(paymentValidations.createSubscriptionValidator),
  paymentController.createPrePaymentSubcriptionSession,
);

router.post(
  '/subscription/create/free-trial',
  authenticate,
  authorize(Role.User),
  validate(paymentValidations.createSubscriptionValidator),
  paymentController.createPostPaymentSubcription,
);

router.get('/subscription/:subscriptionId', authenticate, authorize(Role.User), paymentController.getSubcriptionById);

router.delete(
  '/subscription/:subscriptionId',
  authenticate,
  authorize(Role.User),
  paymentController.deleteSubcriptionById,
);

router.put(
  '/subscription',
  authenticate,
  // authorize(Role.User),
  validate(paymentValidations.updateSubscriptionValidator),
  paymentController.updateSubscription,
);

// Stripe one time payment related routes
router.post(
  '/one-time-payment',
  authenticate,
  authorize(Role.User),
  validate(paymentValidations.createOneTimePaymentValidator),
  paymentController.oneTimePaymentProcess,
);

// Stripe webhook related route
router.post('/webhook', paymentController.paymentWebhooks);

export default router;
