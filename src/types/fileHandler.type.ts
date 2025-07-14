import type { Express } from 'express';
import type { Types } from 'mongoose';

// Define the structure of the file upload database
export interface IFileUpload {
  userId: Types.ObjectId;
  path: string[];
  isDeleted: boolean;
}
export interface IFileUploadType {
  [fieldname: string]: Express.Multer.File[];
}
