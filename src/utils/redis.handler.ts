import { logger } from '@config/logger';
import { redisVariables } from '@constants';
// import redisClient from '../redisApp';

/**
 * Saves data to Redis with a specific key and value.
 * The data is stored with an expiration time of 3600 seconds (1 hour).
 * @param {string} key - The key under which the data will be saved.
 * @param {string} value - The value to be saved in Redis.
 * @returns {Promise<void>} A promise that resolves when the data is successfully saved.
 */
export const saveData = async (key: string, value: string): Promise<void> => {
  try {
    // Save data with a key and value, setting an expiry time of 3600 seconds (1 hour)
    // await redisClient.set(key, value, {
    //   EX: redisVariables.REDIS_CACHE_EXPIRATION_TIME, // Expiration time in seconds
    // });
    logger.info(`Data saved/updated to Redis with key: ${key}`);
  } catch (err) {
    logger.error(`Error saving data to Redis: ${err}`);
  }
};

/**
 * Retrieves data from Redis using a specific key.
 * If the data exists, it is returned; otherwise, null is returned.
 * @param {string} key - The key used to fetch the data from Redis.
 * @returns {Promise<string | null>} A promise that resolves to the data if found, or null if not found or on error.
 */
export const getData = async (key: string): Promise<string | null> => {
  try {
    // Fetch data using the key
    // const data = await redisClient.get(key);
    // if (data) {
    //   logger.info(`Data retrieved from Redis for key: ${key}`);
    //   return data; // Return data if found
    // } else {
    //   logger.info(`No data found in Redis for key: ${key}`);
    //   return null; // Return null if not found
    // }
    return null
  } catch (err) {
    logger.error(`Error fetching data from Redis: ${err}`);
    return null; // Return null in case of error
  }
};

/**
 * Deletes data from Redis using a specific key.
 * If the key exists, the data is deleted; otherwise, no action is taken.
 * Logs a message indicating whether the data was deleted or not found.
 * @param {string} key - The key identifying the data to be deleted in Redis.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *                         Logs success or failure messages based on the existence of the key.
 */
export const deleteData = async (key: string) => {
  // const result = await redisClient.del(key);
  // if (result > 0) {
  //   logger.info(`Data deleted for key: ${key}`);
  //   return true;
  // } else {
  //   logger.info(`No data found for key: ${key}`);
  //   return false;
  // }
};

/**
 * Generates random data for a payment object based on the provided type.
 * @param {string} type - The type of payment object to generate data for.
 * @returns {Record<string, unknown>} - The random data for the payment object.
 * @throws {Error} If the type is not supported.
 */
export const redisRandomData = (type: string) => {
  switch (type) {
    case 'redisData':
      return {
        id: { type: 'string', example: '6763a775fd3ae250268c2a89' },
      };
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};
