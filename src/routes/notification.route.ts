//Third-party modules
import { Router } from 'express';

//Middlewares
import { authenticate, validate } from '@middlewares';

//Controllers
import { notificationController } from '@controllers';

//Validations
import { notificationValidations } from '@validations';

const router = Router();
router.get(
  '/',
  authenticate,
  validate(notificationValidations.getNotificationListSchema),
  notificationController.getNotificationList,
);
export default router;
