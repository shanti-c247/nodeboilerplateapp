// import { fileHandlerVariables } from '@constants';
import { FILE_FORMATS } from '../../constants/variables/fileHandler.variables';

export const FILE_TYPE_ERROR = `Only ${FILE_FORMATS.join(', ')} files are allowed!`;
export const FILE_SIZE_ERROR = 'File size exceeds the allowed limit of:';
export const FILE_UPLOAD_LIMIT_ERROR = 'Unexpected file upload:';
export const DIRECTORY_FOUND_ERROR = 'No directory for upload files:';
export const FILE_DETAIL_GET_SUCCESS = 'File detail get successful.';
export const FILES_GET_SUCCESS = 'Files get successful.';
export const SELECTED_FILE_ERROR = 'Please select a file to upload:';
export const SELECT_FILE_ERROR = 'Please select a file:';
export const FILES_NOT_FOUND = 'File details not found.';
export const FILES_UPLOAD_SUCCESS = 'Files uploaded successfully.';
export const ACCESS_DENIED = 'Access denied: insufficient permissions.';
export const INVALID_FROM_SIZE_UNIT = 'Invalid from unit:';
export const INVALID_TO_SIZE_UNIT = 'Invalid to unit:';
export const SUPPORTED_SIZE_UNITS = 'Supported units: GB, MB, KB, Byte.';
export const S3_UPLOAD_ERROR = 'Unable to upload file on S3 bucket:';
export const UPLOAD_FILE_ERROR = 'Something went wrong when uploading:';
