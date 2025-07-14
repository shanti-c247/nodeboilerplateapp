import { notificationHandler } from '@utils';

const notificationSchemas = {
  Notification: {
    type: 'object',
    properties: notificationHandler.notificationRandomData('notificationSchema'),
  },
};
export default notificationSchemas;
