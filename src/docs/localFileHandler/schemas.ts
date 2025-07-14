import { fileHandler } from '@utils';

const localFileHandlerSchemas = {
  LocalFile: {
    type: 'object',
    properties: fileHandler.fileHandlerRandomData('fileSchema'),
  },

  // Upload File Request
  LocalUploadFileRequest: {
    type: 'object',
    required: ['fileUpload'],
    properties: fileHandler.fileHandlerRandomData('fileUploadSchema'),
  },
};
export default localFileHandlerSchemas;
