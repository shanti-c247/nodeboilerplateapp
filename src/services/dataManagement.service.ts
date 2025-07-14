import { unlink } from 'node:fs/promises';
import csv from 'csvtojson';
import { Parser } from 'json2csv';
import mongoose from 'mongoose';
import PDFDocument from 'pdfkit';

// Config
import { logger } from '@config/logger';

// Utils
import { dataManagementHandler } from '@utils';

// Models
import { BatchModel, DataModel } from '@models';

// Constants
import { BAD_REQUEST, NO_CONTENT, OK, SERVER_ERROR, dataManagementMessages, dataManagementVariables } from '@constants';

// Enums
import { DataBatchStatus } from '@enums';

// Types
import type { ExportFilters, IApiResponse, IFileType, IUser } from '@customTypes';

/**
 * Handles uploading a CSV file
 * @param {IFileType} file - The uploaded CSV file
 * @param {IUser} user - The user who uploaded the file
 * @returns {Promise<IApiResponse>} Response indicating success or failure with message and data
 */
export const uploadFile = async (file: IFileType, user: IUser): Promise<IApiResponse> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!file?.csv_file || file?.csv_file?.length === 0) {
      return {
        status: BAD_REQUEST,
        success: false,
        message: dataManagementMessages.FILE_REQUIRED_ERROR,
        data: null,
      };
    }
    // Create batch record
    const batch = await BatchModel.create(
      [
        {
          uploadedBy: user?.id ?? '',
          fileName: file.csv_file[0].originalname,
          totalRecords: 0,
          status: DataBatchStatus.Processing,
        },
      ],
      { session },
    );

    const startTime = Date.now();
    const filePath = file.csv_file[0].path;

    // Convert CSV to JSON using csvtojson
    const jsonData = await csv().fromFile(filePath);

    await unlink(filePath);

    const { valid, errors, headersError, missingHeaders } = dataManagementHandler.validateCSV(jsonData);

    if (errors.length > 0 || headersError) {
      return {
        status: BAD_REQUEST,
        success: false,
        message: headersError
          ? `${dataManagementMessages.FILE_VALIDATION_ERROR}: Missing headers - ${missingHeaders?.join(', ')}`
          : dataManagementMessages.FILE_VALIDATION_ERROR,
        data: headersError ? null : errors,
      };
    }

    logger.log(`Valid: ${valid} `);
    logger.log(`Errors: ${errors} `);

    const dataItems = valid.map((item) => ({
      ...item,
      createdBy: user?.id,
      lastUpdatedBy: user?.id,
      batchId: batch[0].id,
    }));

    // Save data and update batch
    if (dataItems.length > 0) {
      await DataModel.insertMany(dataItems, { session });
    }

    await dataManagementHandler.updateBatch(session, batch, jsonData, valid, errors, startTime);

    await session.commitTransaction();

    return {
      status: OK,
      success: true,
      message: dataManagementMessages.FILE_DATA_UPLOAD_SUCCESS,
      data: {
        batchId: batch[0].id,
        totalProcessed: jsonData.length,
        successful: valid.length,
        failed: errors.length,
        errors: errors.length > 0 ? errors : null,
      },
    };
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    return {
      status: SERVER_ERROR,
      success: false,
      message: dataManagementMessages.FILE_PROCESSING_ERROR,
      data: error,
    };
  } finally {
    await session.endSession();
  }
};

/**
 * Generates a CSV report based on the data items created by the user
 * @param {ExportFilters} filters - Filters to apply to the data
 * @param {IUser} user - The user who created the data items
 * @returns {Promise<IApiResponse>} Response containing the CSV document or error information
 */
export const downloadFile = async (filters: ExportFilters, user: IUser): Promise<IApiResponse> => {
  try {
    const data = await dataManagementHandler.getDataItemsCreatedByUser(user?.id, filters);
    if (!data || !data.length) {
      return {
        status: BAD_REQUEST,
        success: false,
        message: dataManagementMessages.FILE_DATA_NOT_FOUND,
        data: null,
      };
    }

    const { transformedData, fields } = dataManagementHandler.createTransformedDataAndFields(data);

    const json2csvParser = new Parser({
      fields,
      delimiter: ',',
      quote: '"',
    });
    const csv = json2csvParser.parse(transformedData);

    return {
      status: OK,
      success: true,
      message: dataManagementMessages.FILE_DOWNLOAD_SUCCESS,
      data: csv,
    };
  } catch (error) {
    return {
      status: SERVER_ERROR,
      success: false,
      message: dataManagementMessages.FILE_DOWNLOAD_ERROR,
      data: error,
    };
  }
};

/**
 * Generates a PDF report based on the data items created by the user
 * @param {ExportFilters} filters - Filters to apply to the data
 * @param {IUser} user - The user who created the data items
 * @returns {Promise<IApiResponse>} Response containing the PDF document or error information
 */
export const downloadPdf = async (filters: ExportFilters, user: IUser): Promise<IApiResponse> => {
  try {
    const data = await dataManagementHandler.getDataItemsCreatedByUser(user?.id, filters);

    if (!data || !data.length) {
      return {
        status: BAD_REQUEST,
        success: false,
        message: dataManagementMessages.FILE_DATA_NOT_FOUND,
        data: null,
      };
    }

    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      bufferPages: true,
    });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    dataManagementHandler.addPDFHeaderInfo(doc, dataManagementVariables.PDF_GENERATION_OPTIONS);
    dataManagementHandler.addDataToPDF(doc, data, dataManagementVariables.PDF_GENERATION_OPTIONS);

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => {
        resolve({
          status: OK,
          success: true,
          message: dataManagementMessages.FILE_DOWNLOAD_SUCCESS,
          data: Buffer.concat(chunks),
        });
      });
    });
  } catch (error) {
    return {
      status: SERVER_ERROR,
      success: false,
      message: dataManagementMessages.FILE_DOWNLOAD_ERROR,
      data: error,
    };
  }
};

/**
 * Retrieves a list of data batches uploaded by the specified user.
 *
 * @param {IUser} user - The user whose batches are to be retrieved.
 * @returns {Promise<IApiResponse>} Response containing the list of batches or error information.
 */

export const getBatches = async (user: IUser): Promise<IApiResponse> => {
  try {
    const data = await BatchModel.find({ uploadedBy: user?.id });
    return {
      status: OK,
      success: true,
      message: dataManagementMessages.GET_BATCHES_SUCCESS,
      data,
    };
  } catch (error) {
    return {
      status: SERVER_ERROR,
      success: false,
      message: dataManagementMessages.GET_BATCHES_ERROR,
      data: error,
    };
  }
};

/**
 * Deletes all data items associated with a given batch ID.
 * @param {string} params.batchId - The ID of the batch whose data items are to be deleted.
 * @returns {Promise<IApiResponse>} Response containing the result of the deletion, including the status, success flag, message, and data (if any).
 */
export const deleteDataItemsByBatch = async (params: { batchId: string }): Promise<IApiResponse> => {
  try {
    const batch = await BatchModel.findById(params.batchId);
    if (!batch) {
      return {
        status: BAD_REQUEST,
        success: false,
        message: dataManagementMessages.BATCH_NOT_FOUND,
        data: null,
      };
    }
    await dataManagementHandler.deleteDataItemsAndBatch(params.batchId);
    return {
      status: NO_CONTENT,
      success: true,
      message: dataManagementMessages.FILE_DATA_DELETED_SUCCESS,
      data: null,
    };
  } catch (error) {
    return {
      status: SERVER_ERROR,
      success: false,
      message: dataManagementMessages.FILE_DATA_DELETED_ERROR,
      data: error,
    };
  }
};
