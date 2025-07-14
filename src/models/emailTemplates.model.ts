import type { IEmailTemplate } from '@customTypes';
import mongoose, { type Model, Schema } from 'mongoose';

const emailTemplateSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
    },
    template: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
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

export const EmailTemplate: Model<IEmailTemplate> = mongoose.model<IEmailTemplate>(
  'email_templates',
  emailTemplateSchema,
);
