import { faker } from '@faker-js/faker';
// Third-party modules
import type { NextFunction, Request, Response } from 'express';
import type mongoose from 'mongoose';
import type { Types } from 'mongoose';
import type PDFKit from 'pdfkit';

// Models
import { BatchModel, DataModel } from '@models';

//config
import { logger } from '@config/logger';

//middlewares
import { uploadCsvMiddleware } from '@middlewares';

//utils
import { ErrorHandler, commonHandler } from '@utils';

//constants
import { BAD_REQUEST, SERVER_ERROR, commonMessages, dataManagementMessages, dataManagementVariables } from '@constants';

//types
import type {
  CSVRow,
  CsvRowValidatedItem,
  CsvRowValidationError,
  CsvValidationResult,
  ExportFilters,
  IDataBatch,
  IDataItem,
  PDFGenerationOptions,
} from '@customTypes';

/**
 * Handles CSV file upload with Multer and converts the file size to human-readable format
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 * @returns Promise<void>
 * @throws ErrorHandler with a 400 status code if the file upload fails due to multer
 * @throws ErrorHandler with a 500 status code if an unexpected error occurs
 */
export const uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const convertedFileSize = await commonHandler.convertFileSize(dataManagementVariables.FILE_SIZE, 'Byte', 'MB');

    await uploadCsvMiddleware(req, res, (error) => {
      if (error) {
        logger.error(`Multer Error: ${error}`);
        const customError = handleMulterError(error, convertedFileSize);
        return next(customError);
      }
      next();
    });
  } catch (error) {
    logger.error(`Unexpected error during CSV upload:, ${error}`);
    next(new ErrorHandler(commonMessages.INTERNAL_SERVER_ERROR, SERVER_ERROR, error instanceof Error));
  }
};

/**
 * Handles Multer errors during CSV file upload and returns an ErrorHandler object
 * @param error - Multer error object
 * @param convertedFileSize - The file size in human-readable format (MB)
 * @returns ErrorHandler object with a 400 status code and a custom error message
 */
export const handleMulterError = (error: any, convertedFileSize: number): ErrorHandler => {
  switch (error.code) {
    case dataManagementVariables.MULTER_ERROR_TYPES.LIMIT_FILE_SIZE:
      return new ErrorHandler(
        `${error.field} ${dataManagementMessages.FILE_SIZE_ERROR} ${convertedFileSize}MB`,
        BAD_REQUEST,
        error,
      );
    case dataManagementVariables.MULTER_ERROR_TYPES.ENOENT:
      return new ErrorHandler(
        `${dataManagementMessages.DIRECTORY_FOUND_ERROR} ${dataManagementVariables.UPLOAD_DIR}`,
        BAD_REQUEST,
        error,
      );
    case dataManagementVariables.MULTER_ERROR_TYPES.LIMIT_UNEXPECTED_FILE:
      return new ErrorHandler(
        `${dataManagementMessages.FILE_UPLOAD_LIMIT_ERROR} for ${error.field}`,
        BAD_REQUEST,
        error,
      );
    default:
      return new ErrorHandler(
        error.name === 'Error' ? error.message : `${dataManagementMessages.SOMETHING_WRONG_WHEN_UPLOAD} ${error.field}`,
        BAD_REQUEST,
        error,
      );
  }
};

/**
 * Checks if the given date string is valid and represents a date in the future.
 * @param dateString - The date string to validate
 * @returns true if the date string is valid and represents a date in the future, false otherwise
 */
const isValidDate = (dateString: string): boolean => {
  const date = Date.parse(dateString);
  return !Number.isNaN(date) && date > 0;
};

/**
 * Validates the given MFG date and expiry date strings and returns an array of error messages.
 * @param mfgDate - The MFG date string to validate
 * @param expiryDate - The expiry date string to validate
 * @returns An array of strings containing the error messages
 */
const validateDates = (mfgDate: string, expiryDate: string): string[] => {
  const errors: string[] = [];

  if (!isValidDate(mfgDate)) {
    errors.push(dataManagementMessages.VALID_MFG_DATE);
  }
  if (!isValidDate(expiryDate)) {
    errors.push(dataManagementMessages.VALID_EXPIRY_DATE);
  }
  if (isValidDate(mfgDate) && isValidDate(expiryDate) && Date.parse(mfgDate) >= Date.parse(expiryDate)) {
    errors.push(dataManagementMessages.MFG_DATE_AFTER_EXPIRY_DATE);
  }

  return errors;
};

/**
 * Validates a CSV file with the given data and returns a CsvValidationResult.
 * The CsvValidationResult contains two properties: valid and errors.
 * The valid property contains an array of validated items in the CSV file.
 * Each item is an object with the following properties: itemName, category, mfgDate, expiryDate, status, and companyName.
 * The errors property contains an array of objects with the following properties: row and messages.
 * The row property is the row number where the error occurred (1-indexed).
 * The messages property is an array of strings containing the error messages.
 * @param data The CSV data to validate.
 * @returns A CsvValidationResult with the validation results.
 */
export const validateCSV = (data: CSVRow[]): CsvValidationResult => {
  const result: CsvValidationResult = {
    valid: [],
    errors: [],
    headersError: false,
    missingHeaders: [],
  };
  if (data?.length > 0) {
    const row = data[0];
    const headerRow = Object.keys(row);
    const requiredColumns = [
      dataManagementVariables.STRUCTURED_FILE_FIELDS.itemName,
      dataManagementVariables.STRUCTURED_FILE_FIELDS.category,
      dataManagementVariables.STRUCTURED_FILE_FIELDS.companyName,
      dataManagementVariables.STRUCTURED_FILE_FIELDS.mfgDate,
      dataManagementVariables.STRUCTURED_FILE_FIELDS.expiryDate,
      dataManagementVariables.STRUCTURED_FILE_FIELDS.status,
    ];
    const missingHeaders = requiredColumns.filter((header) => !headerRow.includes(header));
    if (missingHeaders.length > 0) {
      result.headersError = true;
      result.missingHeaders = missingHeaders;
      return result;
    }
  }

  data.forEach((row, index) => {
    const error: CsvRowValidationError = { row: index + 2, messages: [] };
    const {
      [dataManagementVariables.STRUCTURED_FILE_FIELDS.itemName]: itemName,
      [dataManagementVariables.STRUCTURED_FILE_FIELDS.category]: category,
      [dataManagementVariables.STRUCTURED_FILE_FIELDS.companyName]: companyName,
      [dataManagementVariables.STRUCTURED_FILE_FIELDS.mfgDate]: mfgDate,
      [dataManagementVariables.STRUCTURED_FILE_FIELDS.expiryDate]: expiryDate,
      [dataManagementVariables.STRUCTURED_FILE_FIELDS.status]: status,
    } = row;

    // Required field validation
    if (!itemName?.trim()) error.messages.push(dataManagementMessages.REQUIRED_ITEM_NAME);
    if (!category?.trim()) error.messages.push(dataManagementMessages.REQUIRED_CATEGORY);
    if (!companyName?.trim()) error.messages.push(dataManagementMessages.REQUIRED_COMPANY_NAME);

    // Date validation
    error.messages.push(...validateDates(mfgDate, expiryDate));

    if (error.messages.length > 0) {
      result.errors.push(error);
    } else {
      result.valid.push({
        itemName: itemName.trim(),
        category: category.trim(),
        mfgDate: new Date(mfgDate),
        expiryDate: new Date(expiryDate),
        status: status?.toString().trim() || dataManagementVariables.DEFAULT_STATUS,
        companyName: companyName.trim(),
      });
    }
  });

  return result;
};

/**
 * Updates the batch record in the database with the results of the CSV validation and processing time
 * @param {mongoose.ClientSession} session - Mongoose session
 * @param {IDataBatch[]} batch - Batch record
 * @param {CSVRow[]} jsonData - CSV data
 * @param {CsvRowValidatedItem[]} valid - Valid CSV rows
 * @param {CsvRowValidationError[]} errors - Error CSV rows
 * @param {number} startTime - Start time of the CSV processing
 */
export const updateBatch = async (
  session: mongoose.ClientSession,
  batch: IDataBatch[],
  jsonData: CSVRow[],
  valid: CsvRowValidatedItem[],
  errors: CsvRowValidationError[],
  startTime: number,
) => {
  const batchUpdateData = {
    totalRecords: jsonData.length,
    successfulRecords: valid.length,
    failedRecords: errors.length,
    status: errors.length === 0 ? 'completed' : 'completed with errors',
    errors: errors.length > 0 ? errors : undefined,
    processingTime: Date.now() - startTime,
  };
  await BatchModel.findByIdAndUpdate(batch[0].id, batchUpdateData, {
    session,
  });
};

export const formatDate = (date: Date) => date.toISOString().split('T')[0];

/**
 * This function takes in an array of data items and transforms it into a format
 * suitable for exporting to CSV. The function returns an object containing
 * the transformed data and the corresponding fields.
 *
 * The transformed data is an array of objects with the following keys:
 * - "Item Name"
 * - "Category"
 * - "Company Name"
 * - "Manufacturing Date"
 * - "Expiry Date"
 * - "Status"
 * - "Upload Batch"
 * - "Created By"
 * - "Created At"
 *
 * The fields is an array of strings containing the above keys.
 *
 * @param {any[]} data - The array of data items to be transformed.
 * @returns {Object} - An object containing the transformed data and fields.
 */
export const createTransformedDataAndFields = (
  data: IDataItem[],
): { transformedData: Record<string, string>[]; fields: string[] } => {
  const transformedData = data.map((item: any) => ({
    [dataManagementVariables.STRUCTURED_FILE_FIELDS.itemName]: item.itemName,
    [dataManagementVariables.STRUCTURED_FILE_FIELDS.category]: item.category,
    [dataManagementVariables.STRUCTURED_FILE_FIELDS.companyName]: item.companyName,
    [dataManagementVariables.STRUCTURED_FILE_FIELDS.mfgDate]: formatDate(item.mfgDate),
    [dataManagementVariables.STRUCTURED_FILE_FIELDS.expiryDate]: formatDate(item.expiryDate),
    [dataManagementVariables.STRUCTURED_FILE_FIELDS.status]: item.status,
    [dataManagementVariables.STRUCTURED_FILE_FIELDS.batchId]: item.batchId,
    [dataManagementVariables.STRUCTURED_FILE_FIELDS.createdBy]: item.createdBy.name,
    [dataManagementVariables.STRUCTURED_FILE_FIELDS.createdAt]: formatDate(item.createdAt),
  }));

  const fields = Object.keys(transformedData[0]) as string[];

  return { transformedData, fields };
};

/**
 * Adds header information to a PDF document.
 *
 * @param {PDFKit.PDFDocument} doc The PDF document to add the header to.
 * @param {PDFGenerationOptions} options The PDF generation options.
 * @returns {void}
 */
export const addPDFHeaderInfo = (doc: PDFKit.PDFDocument, options: PDFGenerationOptions) => {
  doc.fontSize(20).text(options.title, { align: 'center' });

  if (options.subtitle) {
    doc.fontSize(12).text(options.subtitle, { align: 'center' });
  }

  doc.moveDown(4);
};

export const drawTableRow = (
  doc: PDFKit.PDFDocument,
  rowData: string[],
  colWidths: number[],
  isHeader: boolean,
): void => {
  const startX = 50;
  let x = startX;
  const fontSize = isHeader ? 10 : 9;

  doc.fontSize(fontSize);

  if (isHeader) {
    doc.font('Helvetica-Bold');
  } else {
    doc.font('Helvetica');
  }

  rowData.forEach((cell, i) => {
    doc.text(cell, x, doc.y - 12, {
      width: colWidths[i],
      align: 'left',
    });
    x += colWidths[i] + 10;
  });

  doc.moveDown(2);
};

export const addDataToPDF = (doc: PDFKit.PDFDocument, data: IDataItem[], _options: PDFGenerationOptions): void => {
  const tableHeaders = [
    dataManagementVariables.STRUCTURED_FILE_FIELDS.itemName,
    dataManagementVariables.STRUCTURED_FILE_FIELDS.category,
    dataManagementVariables.STRUCTURED_FILE_FIELDS.mfgDate,
    dataManagementVariables.STRUCTURED_FILE_FIELDS.expiryDate,
    dataManagementVariables.STRUCTURED_FILE_FIELDS.status,
  ];

  // Calculate column widths
  const pageWidth = doc.page.width - 100;
  const colWidths = [pageWidth * 0.25, pageWidth * 0.2, pageWidth * 0.15, pageWidth * 0.15, pageWidth * 0.15];

  drawTableRow(doc, tableHeaders, colWidths, true);

  data.forEach((item) => {
    const row: string[] = [
      item.itemName,
      item.category,
      formatDate(item.mfgDate),
      formatDate(item.expiryDate),
      item.status,
    ];
    drawTableRow(doc, row, colWidths, false);
  });
};

/**
 * Retrieves data items created by a specific user. The function takes in an
 * optional `filters` object that can be used to filter the data items based
 * on the following keys:
 * - "itemName"
 * - "category"
 * - "mfgDate"
 * - "expiryDate"
 * - "status"
 *
 * The function returns an array of objects containing the following keys:
 * - "id"
 * - "itemName"
 * - "category"
 * - "mfgDate"
 * - "expiryDate"
 * - "status"
 * - "companyName"
 * - "batchId"
 * - "createdBy" (an object containing the user's "name" and "email")
 * - "createdAt"
 *
 * @param {Types.ObjectId} userId - The ID of the user who created the data items.
 * @param {ExportFilters} [filters] - An optional object containing filters to apply to the data items.
 * @returns {Promise<any>} - A promise that resolves to an array of data items.
 */
export const getDataItemsCreatedByUser = async (userId: Types.ObjectId, filters?: ExportFilters): Promise<any> => {
  try {
    return await DataModel.find({
      ...filters,
      isActive: true,
      createdBy: userId,
    })
      .select('-__v -isActive -lastUpdatedBy')
      .populate('createdBy', 'name email')
      .lean();
  } catch (error) {
    logger.error(`Could not fetch data items: ${error}`);
    return [];
  }
};

/**
 * Deletes all data items and the corresponding batch associated with the given batch ID.
 *
 * @param {string} batchId - The ID of the batch whose data items and batch record are to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
 * @throws Will log an error if the deletion fails.
 */

export const deleteDataItemsAndBatch = async (batchId: string) => {
  try {
    await DataModel.deleteMany({ batchId: batchId });
    await BatchModel.findByIdAndDelete(batchId);
  } catch (error) {
    logger.error(`Could not delete data items: ${error}`);
  }
};

/**
 * Deletes all data items and batches associated with a specific user.
 *
 * @param {Types.ObjectId} userId - The ID of the user whose data items and batches are to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
 * @throws Will log an error if the deletion fails.
 */
export const deleteDataItemsAndBatchesCreatedByUser = async (userId: Types.ObjectId) => {
  try {
    await DataModel.deleteMany({ createdBy: userId });
    await BatchModel.deleteMany({ createdBy: userId });
  } catch (error) {
    logger.error(`Could not delete data items: ${error}`);
  }
};

/**
 * Takes a query object containing filters and returns an object with the same properties but
 * with the values converted to their corresponding types (e.g. strings to dates).
 *
 * @param {ExportFilters} query - A query object containing filters to apply to the data items.
 * @returns {Promise<ExportFilters>} - A promise that resolves to an object containing the filters with their values converted.
 */
export const buildFilters = async (query: ExportFilters): Promise<ExportFilters> => {
  const filters: ExportFilters = {};

  if (query.startDate) {
    filters.startDate = new Date(query.startDate);
  }
  if (query.endDate) {
    filters.endDate = new Date(query.endDate);
  }
  if (query.category) {
    filters.category = query.category;
  }
  if (query.status) {
    filters.status = query.status;
  }
  if (query.companyName) {
    filters.companyName = query.companyName;
  }
  if (query.batchId) {
    filters.batchId = query.batchId;
  }

  return filters;
};

/**
 * Generates random data for a data management object based on the provided type.
 * @param {string} type - The type of data management object to generate data for.
 * @returns {Record<string, unknown>} - The random data for the data management object.
 * @throws {Error} If the type is not supported.
 */
export const dataManagementRandomData = (type: string) => {
  switch (type) {
    case 'UploadFileResponse':
      return {
        batchId: { type: 'string', example: faker.string.uuid() },
        totalProcessed: { type: 'integer', example: 0 },
        successful: { type: 'integer', example: 0 },
        failed: { type: 'integer', example: 0 },
        errors: { type: 'array', example: [] },
      };
    case 'GetBatchesResponse':
      return {
        id: { type: 'string', example: faker.string.uuid() },
        uploadedBy: { type: 'string', example: faker.string.uuid() },
        fileName: { type: 'string', example: faker.string.uuid() },
        totalRecords: { type: 'integer', example: 0 },
        successfulRecords: { type: 'integer', example: 0 },
        failedRecords: { type: 'integer', example: 0 },
        status: { type: 'string', example: 'status' },
        uploadErrors: { type: 'array', example: [] },
        createdAt: { type: 'string', example: faker.date.past() },
        updatedAt: { type: 'string', example: faker.date.recent() },
        processingTime: { type: 'integer', example: 0 },
      };

    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};
