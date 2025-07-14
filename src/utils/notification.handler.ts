import { logger } from '@config/logger';
import type { INotification, NotificationPayload } from '@customTypes';
import { NotificationPriority, NotificationType } from '@enums';
import { faker } from '@faker-js/faker';
import { Notification } from '@models';
import { socketService } from '@services';
import type { FilterQuery, Types } from 'mongoose';

/**
 * Sends a notification to the specified recipient(s) and persists the notification to the database.
 * @param {NotificationPayload} notification The notification to send
 * @returns {Promise<boolean>} true if the notification is sent and persisted successfully, false otherwise
 */
export const sendNotification = async (notification: NotificationPayload): Promise<boolean> => {
  try {
    const io = socketService.socketStore.io;
    if (!io) {
      throw new Error('Socket.IO server not initialized');
    }
    const { recipientId, type } = notification;

    if (recipientId) {
      // Send to specific user
      const recipientSockets = Array.from(socketService.socketStore.connectedUsers.values())
        .filter((client) => client.userId === recipientId.toString())
        .map((client) => client.socketId);

      recipientSockets.forEach((socketId) => io.to(socketId).emit('notification', notification));
    } else {
      // Broadcast to all connected clients
      io.emit('notification', notification);
    }

    logger.info(`Notification sent: ${type}`);

    // Save notification to the database
    await Notification.create({
      userId: recipientId || null,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      metadata: notification.metadata,
      priority: notification.priority,
      deliveredAt: new Date(),
    });

    return true;
  } catch (error: any) {
    logger.error(`Error sending notification: ${error.message}`);
    return false;
  }
};

/**
 * Broadcast a system alert notification to all connected clients.
 *
 * @param {string} message The message to be sent as the system alert.
 * @returns {Promise<boolean>} A promise resolving to true if the notification is sent successfully, false otherwise.
 */
export const broadcastSystemAlert = async (message: string): Promise<boolean> => {
  return sendNotification({
    type: NotificationType.SYSTEM_ALERT,
    title: 'System Alert',
    message,
    priority: NotificationPriority.HIGH,
  });
};

/**
 * Creates a filter query for retrieving notifications based on specified criteria.
 *
 * @param {string[]} [type] - An optional array of notification types to filter by.
 * @param {Date} [startDate] - An optional start date to filter notifications created on or after this date.
 * @param {Date} [endDate] - An optional end date to filter notifications created on or before this date.
 * @param {Types.ObjectId} [userId] - An optional user ID to filter notifications for a specific user.
 * @returns {FilterQuery<INotification>} A MongoDB filter query object for fetching notifications.
 * @throws {Error} If there is an error while creating the notification filter.
 */

export const createNotificationListFilter = (
  userId: Types.ObjectId | string,
  type?: string[],
  startDate?: Date,
  endDate?: Date,
): FilterQuery<INotification> => {
  try {
    const filter: FilterQuery<INotification> = {
      $or: [{ userId }, { type: { $in: [NotificationType.ALL, NotificationType.SYSTEM_ALERT] } }],
    };

    if (type?.length) filter.type = { $in: type };
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    return filter;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    throw new Error(`Error creating notification filter: ${errorMessage}`);
  }
};

/**
 * Generates random data for a notification based on the provided type.
 * @param {string} type - The type of notification to generate data for.
 * @returns {Record<string, unknown>} - The random data for the notification.
 * @throws {Error} If the type is not supported.
 */
export const notificationRandomData = (type: string) => {
  switch (type) {
    case 'notificationSchema':
      return {
        id: { type: 'string', example: faker.string.uuid() },
        type: { type: 'boolean', example: true },
        title: { type: 'string', example: faker.lorem.sentence() },
        message: { type: 'string', example: faker.lorem.sentence() },
        userId: { type: 'string', example: faker.string.uuid() },
        metadata: { type: 'object', example: { key: 'value' } },
        priority: { type: 'string', example: NotificationPriority.MEDIUM, enum: Object.values(NotificationPriority) },
        deliveredAt: { type: 'string', format: 'date-time', example: faker.date.recent() },
        createdAt: { type: 'string', format: 'date-time', example: faker.date.recent() },
        updatedAt: { type: 'string', format: 'date-time', example: faker.date.recent() },
      };
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};
