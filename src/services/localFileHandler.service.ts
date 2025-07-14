import { BAD_REQUEST, CREATED, NOT_FOUND, OK, fileHandlerMessages } from '@constants';
import type { IApiResponse, IFileUploadType, IUser } from '@customTypes';
import { Role } from '@enums';
import { File } from '@models';
import { Types } from 'mongoose';

/**
 * Get particular file from the database with storage type.
 * @param {string} fileId - Id of the file to fetch
 * @returns {IApiResponse} Response containing the file and error information
 */
export const fetchLocalFile = async (fileId: string): Promise<IApiResponse> => {
  if (!fileId) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: fileHandlerMessages.SELECT_FILE_ERROR,
      data: null,
    };
  }
  const fileData = await File.findById(new Types.ObjectId(fileId));

  if (!fileData)
    return {
      status: NOT_FOUND,
      success: false,
      message: fileHandlerMessages.FILES_NOT_FOUND,
      data: null,
    };
  return {
    status: OK,
    success: true,
    message: fileHandlerMessages.FILE_DETAIL_GET_SUCCESS,
    data: fileData,
  };
};

/**
 * Get list of files with storage type of a user from the database.
 * @param {Request} req Express request object
 * @returns {IApiResponse} Response containing the files and user detail or error information
 */
export const fetchLocalFileList = async (user: IUser): Promise<IApiResponse> => {
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
 * Store local file path of user in database.
 * @param {Request} req Express request object
 * @returns {IApiResponse} Response containing the files and user detail or error information
 */
export const localFileUpload = async (user: IUser, files: IFileUploadType): Promise<IApiResponse> => {
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
    status: CREATED,
    success: true,
    message: fileHandlerMessages.FILES_UPLOAD_SUCCESS,
    data: result,
  };
};
