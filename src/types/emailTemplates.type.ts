import type { Document } from 'mongoose';

export interface IEmailTemplate extends Document {
  slug: string;
  subject: string;
  template: string;
  isActive: boolean;
  isDeleted: boolean;
}
export interface ITemplateData {
  [key: string]: string | number | boolean | Record<string, unknown> | undefined;
}

export interface IEmailData {
  toEmail: string;
  toName: string;
  templateName: string;
  data?: ITemplateData;
}
