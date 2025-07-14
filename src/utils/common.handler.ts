import fs from 'node:fs';
//Internal modules
import path from 'node:path';
import jwt from 'jsonwebtoken';

import env from '@config/envVar';
//Config
import { logger } from '@config/index';

//Constants
import { commonMessages } from '@constants';

//Constants
//Types
import type { AuthTokenPayload } from '@customTypes';
export const isLogger = env.NODE_ENV === 'development';

/**
 * Converts a file size from one unit to another.
 * @param {number} size The size of the file in the given unit.
 * @param {string} fromUnit The unit that the given size is in.
 * @param {string} toUnit The unit to convert the size to.
 * @returns {number} The size of the file in the given unit.
 * @throws {Error} If either the fromUnit or toUnit is not a valid unit.
 */
export const convertFileSize = async (size: number, fromUnit: string, toUnit: string) => {
  logger.log(`${size}, ${fromUnit}, ${toUnit}`);
  // File size conversion units in bytes
  const unitsInBytes: { [key: string]: number } = {
    gb: 1024 * 1024 * 1024, // 1 GB = 1024 * 1024 * 1024 Bytes
    mb: 1024 * 1024, // 1 MB = 1024 * 1024 Bytes
    kb: 1024, // 1 KB = 1024 Bytes
    byte: 1, // 1 Byte
  };

  // Normalize units to lowercase to handle case-insensitivity
  const fromUnitLower = fromUnit.toLowerCase();
  const toUnitLower = toUnit.toLowerCase();

  // Check if the provided units are valid
  if (!unitsInBytes[fromUnitLower]) {
    throw new Error(`${commonMessages.INVALID_FROM_UNIT} "${fromUnit}". ${commonMessages.SUPPORTED_SIZE_UNITS}`);
  }

  if (!unitsInBytes[toUnitLower]) {
    throw new Error(`${commonMessages.INVALID_TO_UNIT} "${toUnit}". ${commonMessages.SUPPORTED_SIZE_UNITS}`);
  }

  // Convert from `fromUnit` to bytes
  const sizeInBytes = size * unitsInBytes[fromUnitLower];

  // Convert from bytes to `toUnit`
  logger.log(`${sizeInBytes / unitsInBytes[toUnitLower]}`);
  return sizeInBytes / unitsInBytes[toUnitLower];
};

/**
 * Converts a time duration from one unit to another.
 * @param {number} duration The duration of time in the given unit.
 * @param {string} fromUnit The unit that the given duration is in.
 * @param {string} toUnit The unit to convert the duration to.
 * @returns {number} The duration of time in the given unit.
 * @throws {Error} If either the fromUnit or toUnit is not a valid unit.
 */
export const convertTime = async (duration: number, fromUnit: string, toUnit: string) => {
  // Time conversion units in milliseconds
  const unitsInMilliseconds: { [key: string]: number } = {
    year: 365 * 24 * 60 * 60 * 1000, // 1 year = 365 days in milliseconds
    month: 30 * 24 * 60 * 60 * 1000, // 1 month = 30 days in milliseconds
    day: 24 * 60 * 60 * 1000, // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    hour: 60 * 60 * 1000, // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
    minute: 60 * 1000, // 1 minute = 60 seconds * 1000 milliseconds
    second: 1000, // 1 second = 1000 milliseconds
    millisecond: 1, // 1 millisecond
  };

  // Normalize units to lowercase to handle case-insensitivity
  const fromUnitLower = fromUnit.toLowerCase();
  const toUnitLower = toUnit.toLowerCase();

  // Check if the provided units are valid
  if (!unitsInMilliseconds[fromUnitLower]) {
    throw new Error(`${commonMessages.INVALID_FROM_UNIT} "${fromUnit}". ${commonMessages.SUPPORTED_TIME_UNITS}`);
  }

  if (!unitsInMilliseconds[toUnitLower]) {
    throw new Error(`${commonMessages.INVALID_TO_UNIT} "${toUnit}". ${commonMessages.SUPPORTED_TIME_UNITS}`);
  }

  // Convert from `fromUnit` to milliseconds
  const durationInMilliseconds = duration * unitsInMilliseconds[fromUnitLower];

  // Convert from milliseconds to `toUnit`

  return durationInMilliseconds / unitsInMilliseconds[toUnitLower];
};

/**
 * Conditionally imports a module based on the existence of a file.
 * @param {string} modulePath The path to the module to import.
 * @param {string} importPath The path to the import statement.
 * @returns {Promise<object | T>} A promise that resolves to the imported module if the file exists, or an empty object if it does not.
 */
export const conditionalImport = <T = Record<string, unknown>>(
  modulePath: string,
  importPath: string,
): Promise<object | T> => {
  const absolutePath = path.resolve(modulePath);

  if (fs.existsSync(absolutePath)) {
    return import(importPath).catch((_e) => {
      return {};
    });
  }
  return Promise.resolve({});
};
/**
 * Verifies a JWT token using a secret key.
 *
 * @param {string} token - The JWT token to verify.
 * @param {string} secret - The secret key to use for verification.
 * @returns {Promise<AuthTokenPayload>} - A promise that resolves to the decoded payload,
 *   or rejects with an error if the token is invalid.
 */
export const verifyJwt = (token: string, secret: string): Promise<AuthTokenPayload> =>
  new Promise((resolve, reject) =>
    jwt.verify(token, secret, (err, decoded) => {
      if (err || typeof decoded !== 'object' || !('id' in decoded)) {
        return reject(err || new Error(commonMessages.INVALID_TOKEN));
      }
      resolve(decoded as AuthTokenPayload);
    }),
  );
