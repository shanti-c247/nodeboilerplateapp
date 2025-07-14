//types
import type { PDFGenerationOptions } from '@customTypes';

export const ATTATCHMENT_NAME = `Data_Export_${new Date().toISOString().split('T')[0]}.csv`;
export const DATAMANAGEMENT_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/dataManagement/operations.ts';
export const DEFAULT_STATUS = 'available';
export const FILE_FORMATS = ['csv']; //supported file formats
export const FILE_UPLOAD_FIELD = 'csv_file'; //field name
export const FILE_UPLOAD_LIMIT = 1; //maximum number of files
export const FILE_SIZE = 50 * 1024 * 1024; //50 MB
//multer error types
export const MULTER_ERROR_TYPES = {
  LIMIT_FILE_SIZE: 'LIMIT_FILE_SIZE',
  ENOENT: 'ENOENT',
  LIMIT_UNEXPECTED_FILE: 'LIMIT_UNEXPECTED_FILE',
} as const;
export const PDF_ATTATCHMENT_NAME = `Data_report_${new Date().toISOString().split('T')[0]}.pdf`;
//PDF report generation options
export const PDF_GENERATION_OPTIONS: PDFGenerationOptions = {
  title: 'Data Management Report',
  subtitle: `Generated on ${new Date().toLocaleDateString()}`,
  includeTotals: true,
};
//structured file fields
export const STRUCTURED_FILE_FIELDS = {
  itemName: 'Item Name',
  category: 'Category',
  mfgDate: 'MFG Date',
  expiryDate: 'Expiry Date',
  status: 'Status',
  companyName: 'Company Name',
  batchId: 'Upload Batch',
  createdAt: 'Created At',
  createdBy: 'Created By',
} as const;
export const UPLOAD_DIR = 'uploads'; //upload directory
export const UPLOAD_FOLDER = 'csvFiles'; //upload folder
