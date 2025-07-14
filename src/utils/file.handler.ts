import { faker } from '@faker-js/faker';

/**
 * Generates random data for a file handler based on the provided type.
 * @param {string} type - The type of file handler data to generate.
 * @returns {Record<string, unknown>} - The random data for the file handler.
 * @throws {Error} If the type is not supported.
 */
export const fileHandlerRandomData = (type: string) => {
  switch (type) {
    case 'fileSchema':
      return {
        id: { type: 'string', example: faker.string.uuid() },
        userId: { type: 'string', example: faker.string.uuid() },
        path: { type: 'string', example: faker.system.filePath() },
        isDeleted: { type: 'boolean', example: faker.datatype.boolean() },
        createdAt: { type: 'string', example: faker.date.past() },
        updatedAt: { type: 'string', example: faker.date.past() },
      };
    case 'fileUploadSchema':
      return {
        fileUpload: { type: 'string', format: 'binary', example: faker.system.fileName() },
      };
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};
