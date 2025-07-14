import { BAD_REQUEST, OK, fileHandlerMessages } from '@constants';
import type { IApiResponse, IFileUploadType, IUser } from '@customTypes';
import { Role } from '@enums';
import { File } from '@models';

/**
 * Get particular file from the database with storage type.
 * @param {Request} req Express request object
 * @returns {IApiResponse} Response containing the files and user detail or error information
 */
export const fetchS3File = async (fileId: string): Promise<IApiResponse> => {
  if (!fileId) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: fileHandlerMessages.SELECT_FILE_ERROR,
      data: null,
    };
  }
  const file = await File.findById(fileId);
  if (!file)
    return {
      status: BAD_REQUEST,
      success: false,
      message: fileHandlerMessages.FILES_NOT_FOUND,
      data: null,
    };
  return {
    status: OK,
    success: true,
    message: fileHandlerMessages.FILE_DETAIL_GET_SUCCESS,
    data: file,
  };
};

/**
 * Get list of files with storage type of a user from the database.
 * @param {Request} req Express request object
 * @returns {IApiResponse} Response containing the files and user detail or error information
 */
export const fetchS3FileList = async (user: IUser): Promise<IApiResponse> => {
  const fileFilter = user.role === Role.User ? { userId: user.id } : {};

  const userFiles = await File.find(fileFilter);

  return {
    status: OK,
    success: true,
    message: fileHandlerMessages.FILES_GET_SUCCESS,
    data: userFiles,
  };
};

/**
 * Store local file path with storage_type to user in database.
 * @param {Request} req Express request object
 * @returns {IApiResponse} Response containing the files and user detail or error information
 */
export const s3FileUpload = async (user: IUser, files: IFileUploadType): Promise<IApiResponse> => {
  const uploadedFiles: string[] = [];

  if (files) {
    if (files?.fileUpload) {
      files.fileUpload.forEach((file: { path: string }) => uploadedFiles.push(file.path));
    }
  }
  if (uploadedFiles.length === 0) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: fileHandlerMessages.SELECTED_FILE_ERROR,
      data: null,
    };
  }

  const result = await File.create({
    userId: user.id,
    path: uploadedFiles,
  });

  return {
    status: OK,
    success: true,
    message: fileHandlerMessages.FILES_UPLOAD_SUCCESS,
    data: result,
  };
};
