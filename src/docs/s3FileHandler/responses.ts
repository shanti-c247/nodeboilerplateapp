// constants
import { fileHandlerMessages, fileHandlerVariables } from '@constants';

// utils
import { swaggerHandler } from '@utils';

const s3FileHandlerResponses = {
  S3FileUploaded: swaggerHandler.createSuccessResponse(fileHandlerMessages.FILES_UPLOAD_SUCCESS, {
    $ref: fileHandlerVariables.REF_S3_FILE,
  }),
  S3FileFetched: swaggerHandler.createSuccessResponse(fileHandlerMessages.FILE_DETAIL_GET_SUCCESS, {
    $ref: fileHandlerVariables.REF_S3_FILE,
  }),
  S3FileListFetched: swaggerHandler.createSuccessResponse(
    fileHandlerMessages.FILES_GET_SUCCESS,
    swaggerHandler.createListResponse(
      {
        $ref: fileHandlerVariables.REF_S3_FILE,
      },
      fileHandlerMessages.FILES_GET_SUCCESS,
    ),
  ),
};

export default s3FileHandlerResponses;
