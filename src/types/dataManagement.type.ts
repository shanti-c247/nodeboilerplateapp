import type { Express } from 'express';
//third-party modules
import type { Document, Types } from 'mongoose';

export interface CSVRow {
  'Item Name': string;
  Category: string;
  'Company Name': string;
  'MFG Date': string;
  'Expiry Date': string;
  Status?: string | number;
}

export interface CsvRowValidatedItem {
  itemName: string;
  category: string;
  mfgDate: Date;
  expiryDate: Date;
  status: string | number;
  companyName: string;
}

export interface CsvRowValidationError {
  row: number;
  messages: string[];
}

export interface CsvValidationResult {
  valid: CsvRowValidatedItem[];
  errors: CsvRowValidationError[];
  headersError: boolean;
  missingHeaders: string[];
}
export interface IDataItem extends Document {
  createdAt(createdAt: any): string;
  id: Types.ObjectId;
  itemName: string;
  category: string;
  mfgDate: Date;
  expiryDate: Date;
  status: string;
  companyName: string;
  createdBy: Types.ObjectId;
  lastUpdatedBy: Types.ObjectId;
  isActive: boolean;
  version: number;
  batchId: string; // To group items from same CSV upload
}

export interface IDataBatch extends Document {
  uploadedBy: Types.ObjectId;
  fileName: string;
  totalRecords: number;
  successfulRecords: number;
  failedRecords: number;
  status: 'processing' | 'completed' | 'failed';
  uploadErrors?: Array<{
    row: number;
    messages: string[];
  }>;
  processingTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFileType {
  [fieldname: string]: Express.Multer.File[];
}
export interface ExportFilters {
  startDate?: Date;
  endDate?: Date;
  category?: string;
  status?: string;
  companyName?: string;
  batchId?: string;
}

export interface PDFGenerationOptions {
  title: string;
  subtitle?: string;
  groupBy?: 'category' | 'company' | 'status';
  includeTotals?: boolean;
}
