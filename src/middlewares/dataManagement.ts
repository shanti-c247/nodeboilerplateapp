import fs from 'node:fs';
//third-party modules
import path from 'path';
import multer from 'multer';

//config
import { logger } from '@config/logger';

//constants
import { dataManagementMessages, dataManagementVariables } from '@constants';

/**
 * Ensures that the specified directory exists. If the directory does not exist,
 * it creates the directory and any necessary parent directories.
 *
 * @param dirPath - The path of the directory to check and create if necessary.
 */
const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Returns the directory path where CSV files will be uploaded.
 *
 * The directory path is resolved relative to the root of the project.
 * The directory is created if it does not exist.
 *
 * @returns The path of the upload directory.
 */
const getUploadDestination = () => {
  const destinationPath = path.join(
    __dirname,
    `../../public/${dataManagementVariables.UPLOAD_DIR}/${dataManagementVariables.UPLOAD_FOLDER}/`,
  );
  ensureDirectoryExists(destinationPath);
  return destinationPath;
};

/**
 * Upload middleware for CSV files.
 *
 * @param _req - The request object.
 * @param _file - The file object.
 * @param cb - The callback function.
 * @returns The file name and path of the uploaded file.
 */
export const uploadCsvMiddleware = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      const destinationPath = getUploadDestination();
      logger.info(`File upload path: ${destinationPath}`);
      cb(null, destinationPath);
    },
    filename: (_req, file, cb) => {
      const fileName = `${Date.now().toString()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
  limits: {
    fileSize: dataManagementVariables.FILE_SIZE,
  },
  fileFilter: (_req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    if (dataManagementVariables.FILE_FORMATS.includes(extname.slice(1))) {
      cb(null, true);
    } else {
      cb(new Error(dataManagementMessages.FILE_TYPE_ERROR));
    }
  },
}).fields([
  {
    name: dataManagementVariables.FILE_UPLOAD_FIELD,
    maxCount: dataManagementVariables.FILE_UPLOAD_LIMIT,
  },
]);
