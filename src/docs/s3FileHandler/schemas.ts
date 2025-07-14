import { fileHandler } from '@utils';

const s3FileHandlerSchemas = {
  // File schema
  S3File: {
    type: 'object',
    properties: fileHandler.fileHandlerRandomData('fileSchema'),
  },

  // Upload File Request
  S3UploadFileRequest: {
    type: 'object',
    required: ['fileUpload'],
    properties: fileHandler.fileHandlerRandomData('fileUploadSchema'),
  },
};
export default s3FileHandlerSchemas;
