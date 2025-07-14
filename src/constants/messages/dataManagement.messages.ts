//constants
// import { dataManagementVariables } from '@constants';
import { FILE_FORMATS } from '../../constants/variables/dataManagement.variables';

export const BATCH_NOT_FOUND = 'Batch not found.';
export const DIRECTORY_FOUND_ERROR = 'No directory for upload files:';
export const FILE_REQUIRED_ERROR = 'File is required.';
export const FILE_PROCESSING_ERROR = 'Error processing file.';
export const FILE_VALIDATION_ERROR = 'File validation failed:';
export const FILE_DATA_UPLOAD_SUCCESS = 'File data uploaded successfully.';
export const FILE_DOWNLOAD_SUCCESS = 'File downloaded successfully.';
export const FILE_DOWNLOAD_ERROR = 'Error downloading file.';
export const FILE_DATA_DELETED_SUCCESS = 'File data deleted successfully.';
export const FILE_DATA_DELETED_ERROR = 'Error deleting file data.';
export const FILE_DATA_NOT_FOUND = 'File data not found.';
export const FILE_SIZE_ERROR = 'File size exceeds the allowed limit of:';
export const FILE_UPLOAD_LIMIT_ERROR = 'Unexpected file upload:';
export const FILE_TYPE_ERROR = `Only ${FILE_FORMATS.join(', ')} files are allowed!`;
export const GET_BATCHES_SUCCESS = 'Batches fetched successfully.';
export const GET_BATCHES_ERROR = 'Error fetching batches.';
export const MFG_DATE_AFTER_EXPIRY_DATE = 'Expiry date must be after MFG Date.';
export const SOMETHING_WRONG_WHEN_UPLOAD = 'Something went wrong when uploading.';

export const REQUIRED_ITEM_NAME = 'Item name is required.';
export const REQUIRED_CATEGORY = 'Category is required.';
export const REQUIRED_COMPANY_NAME = 'Company name is required.';
export const VALID_EXPIRY_DATE = 'Expiry date must be a valid date.';
export const VALID_MFG_DATE = 'MFG date must be a valid date.';
