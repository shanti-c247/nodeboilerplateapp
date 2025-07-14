import { OK, SERVER_ERROR, commonMessages, notificationMessages } from '@constants';
import type { INotification, UnifiedNotificationServiceResponse } from '@customTypes';
import { Notification } from '@models';
import { notificationHandler } from '@utils';

/**
 * Retrieves a list of notifications for the authenticated user.
 * @param {number} page The page number to fetch notifications from.
 * @param {number} limit The number of notifications to fetch per page.
 * @param {id} string The id for fetch notifications of user.
 * @param {string[]} [type] An optional array of notification types to filter by.
 * @param {Date} [startDate] An optional start date to filter notifications by.
 * @param {Date} [endDate] An optional end date to filter notifications by.
 * @returns {Promise<UnifiedNotificationServiceResponse>} A promise resolving to an object containing the list of notifications and pagination information.
 */
export const getNotificationList = async (
  page: number,
  limit: number,
  id: string,
  type?: string[],
  startDate?: Date,
  endDate?: Date,
): Promise<UnifiedNotificationServiceResponse> => {
  try {
    const filter = notificationHandler.createNotificationListFilter(id, type, startDate, endDate);
    const [total, notifications] = await Promise.all([
      Notification.countDocuments(filter),
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit)),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const data = {
      notifications: notifications as INotification[],
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    };
    return {
      status: OK,
      success: true,
      message: notificationMessages.NOTIFICATION_FETCH_SUCCESS,
      data,
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
