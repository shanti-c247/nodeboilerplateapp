import { notificationMessages } from '@constants';
import { swaggerHandler } from '@utils';

const notificationResponses = {
  NotificationList: swaggerHandler.createSuccessResponse(
    notificationMessages.NOTIFICATION_FETCH_SUCCESS,
    swaggerHandler.createListResponse(
      { $ref: '#/components/schemas/Notification' },
      notificationMessages.NOTIFICATION_FETCH_SUCCESS,
      true,
    ),
  ),
};

export default notificationResponses;
