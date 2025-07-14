import type { NotificationPriority, NotificationType } from '@enums';
import type { Types } from 'mongoose';
import type { Server } from 'socket.io';

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  message: string;
  recipientId?: string | Types.ObjectId;
  metadata?: Record<string, unknown>;
  priority?: NotificationPriority;
  expiresAt?: Date;
}

export interface ConnectedUsers {
  userId: string;
  socketId: string;
  lastActive: Date;
  email: string;
}

export interface SocketStore {
  io: Server | null;
  connectedUsers: Map<string, ConnectedUsers>;
}

export interface INotification extends Document {
  userId: Types.ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
  priority: NotificationPriority;
  deliveredAt?: Date;
}

export interface NotificationListResponse {
  notifications: INotification[] | [] | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
export interface UnifiedNotificationServiceResponse {
  status: number;
  success: boolean;
  message: string;
  data: NotificationListResponse | null;
  error?: Error | null;
}

export interface NotificationQueryParams {
  userId?: Types.ObjectId;
  page?: number;
  limit?: number;
  type?: string[];
  startDate?: Date;
  endDate?: Date;
}

export interface INotificationUser extends Document {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  countryCode: string;
  role: number;
  status: number;
}
