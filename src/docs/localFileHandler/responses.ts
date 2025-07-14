// constants
import { fileHandlerMessages, fileHandlerVariables } from '@constants';

// utils
import { swaggerHandler } from '@utils';

const localFileHandlerResponses = {
  FileUploaded: swaggerHandler.createSuccessResponse(fileHandlerMessages.FILES_UPLOAD_SUCCESS, {
    $ref: fileHandlerVariables.REF_LOCAL_FILE,
  }),
  FileFetched: swaggerHandler.createSuccessResponse(fileHandlerMessages.FILE_DETAIL_GET_SUCCESS, {
    $ref: fileHandlerVariables.REF_LOCAL_FILE,
  }),
  FileListFetched: swaggerHandler.createSuccessResponse(
    fileHandlerMessages.FILES_GET_SUCCESS,
    swaggerHandler.createListResponse(
      {
        $ref: fileHandlerVariables.REF_LOCAL_FILE,
      },
      fileHandlerMessages.FILES_GET_SUCCESS,
    ),
  ),
};

export default localFileHandlerResponses;
