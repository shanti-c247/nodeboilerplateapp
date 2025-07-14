import { dataManagementHandler } from '@utils';

const dataManagementSchemas = {
  UploadFileData: {
    type: 'object',
    properties: dataManagementHandler.dataManagementRandomData('UploadFileResponse'),
  },

  UploadFileRequest: {
    type: 'object',
    properties: {
      csv_file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
  GetBatchesResponse: {
    type: 'object',
    properties: dataManagementHandler.dataManagementRandomData('GetBatchesResponse'),
  },
};

export default dataManagementSchemas;
