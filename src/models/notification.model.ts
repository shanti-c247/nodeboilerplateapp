import type { INotification } from '@customTypes';
import { NotificationPriority, NotificationType } from '@enums';
import mongoose, { type Model, Schema } from 'mongoose';

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', default: null },
    type: {
      type: String,
      required: true,
      enum: NotificationType,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    priority: {
      type: String,
      required: true,
      enum: NotificationPriority,
      default: NotificationPriority.MEDIUM,
    },
    deliveredAt: { type: Date },
  },
  { timestamps: true },
);

NotificationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    ret.id = ret._id;
    // biome-ignore lint/performance/noDelete: <explanation>
    delete ret._id;
    return ret;
  },
});
NotificationSchema.index({ userId: 1, type: 1 });

export const Notification: Model<INotification> = mongoose.model<INotification>('notifications', NotificationSchema);
