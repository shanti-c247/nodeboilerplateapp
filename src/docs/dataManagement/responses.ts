import { dataManagementMessages } from '@constants';
import { swaggerHandler } from '@utils';

const dataManagementResponses = {
  UploadFile: swaggerHandler.createSuccessResponse(dataManagementMessages.FILE_DATA_UPLOAD_SUCCESS, {
    $ref: '#/components/schemas/UploadFileData',
  }),
  GetBatches: swaggerHandler.createSuccessResponse(
    dataManagementMessages.GET_BATCHES_SUCCESS,
    swaggerHandler.createListResponse(
      {
        $ref: '#/components/schemas/GetBatchesResponse',
      },
      dataManagementMessages.GET_BATCHES_SUCCESS,
    ),
  ),
};

export default dataManagementResponses;
