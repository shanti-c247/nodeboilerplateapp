import { commonMessages, CREATED, NOT_FOUND, OK, redisMessages, SERVER_ERROR } from '@constants';
import { User } from '@models';
import { paginationHandler, redisHandler } from '@utils';

/**
 * Saves data to Redis with a specified key.
 * If the operation is successful, it returns a success response.
 * In case of an error, it returns an appropriate error response.
 * @param {string} key - The key under which the data will be stored in Redis.
 * @param {any} value - The data to be stored, typically serialized to a string.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null}>}
 */
export const saveToRedis = async (id: string) => {
  try {
    /**
     * Find data into db by id
     */
    const userDoc = await User.findById(id);
    const redisKey = `user:${id}`;
    // save/update data in redis cache
    await redisHandler.saveData(redisKey, JSON.stringify(userDoc));
    return {
      status: CREATED,
      success: true,
      message: redisMessages.REDIS_SAVE,
      data: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Retrieves data from Redis by ID, and if not found, fetches it from the database.
 * The retrieved data is then cached in Redis.
 * If the operation is successful, it returns a success response with the data.
 * In case of an error, it returns an appropriate error response.
 * @param {string} id - The ID used to fetch the data from Redis or the database.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
export const getData = async (id: string) => {
  const redisKey = `user:${id}`;
  try {
    // Check if data exists in Redis
    const cachedData = await redisHandler.getData(redisKey);
    return {
      status: cachedData ? OK : NOT_FOUND,
      success: true,
      message: cachedData ? redisMessages.REDIS_GET : redisMessages.REDIS_NOT_FOUND,
      data: cachedData ? JSON.parse(cachedData) : null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    return {
      status: 500,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Retrieves datas from Redis, and if not found, fetches it from the database.
 * The retrieved data is then cached in Redis.
 * If the operation is successful, it returns a success response with the data.
 * In case of an error, it returns an appropriate error response.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
export const getAll = async (
  search: string,
  sortField: string,
  sortOrder: string,
  pageSize: number,
  pageNumber: number,
) => {
  const orderBy = sortOrder ? sortOrder : 'asc';
  // get pagination for manage pagination records
  const { limit, offset } = paginationHandler.getPagination(pageNumber, pageSize);
  // Define cache key to include pagination parameters
  const redisKey = `all_users_${search}_${sortField}_${orderBy}_${limit}_${offset}`;
  try {
    // Check if data exists in Redis
    const cachedData = await redisHandler.getData(redisKey);
    return {
      status: cachedData ? OK : NOT_FOUND,
      success: true,
      message: cachedData ? redisMessages.GET_ALL : redisMessages.REDIS_NOT_FOUND,
      data: cachedData ? JSON.parse(cachedData) : null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    return {
      status: 500,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Deletes data from Redis by a specific key.
 * @param {string} key - The Redis key to delete.
 * @returns {Promise<number>} A promise that resolves to the result of the deletion operation.
 */
export const removeData = async (id: string) => {
  try {
    const redisKey = `user:${id}`; //based on collection
    await redisHandler.deleteData(redisKey);
    return {
      status: OK,
      success: true,
      message: redisMessages.REDIS_DELETE,
      data: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    return {
      status: SERVER_ERROR,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};
