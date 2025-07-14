import { commonVariables } from '@constants';
import type { IFileUpload } from '@customTypes';
import mongoose, { type Model, Schema } from 'mongoose';

const fileSchema = new Schema<IFileUpload>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    path: {
      type: [String],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Customize JSON transformation to exclude sensitive data
fileSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id; // Add id
    commonVariables.USER_SENSITIVE_INFO_DB_COLUMNS.forEach((field) => delete ret[field]);
    return ret;
  },
});

export const File: Model<IFileUpload> = mongoose.model<IFileUpload>('files', fileSchema);
