import { logger } from '@config/logger';
import { commonVariables } from '@constants';
import type { IUser } from '@customTypes';
import { User, modelToDomain } from '@models';

/**
 * Checks if a user exists in the database by their email.
 * @param {string} email - The email of the user to check for existence.
 * @returns {Promise<boolean>} - Resolves to true if the user exists, otherwise false.
 */
export const checkIfUserExists = async (email: string): Promise<boolean> => {
  const existingUser = await User.findOne({ email });
  return !!existingUser;
};

/**
 * Retrieves a user by their ID from the database.
 * @param {string} userId - The ID of the user to be retrieved.
 * @returns {Promise<IUser | null>} - The user document if found, otherwise null.
 */
export const getUserById = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId);
};

/**
 * Retrieves a paginated list of users from the database with specified filtering and sorting.
 *
 * @param {number} limit - The maximum number of users to return.
 * @param {number} offset - The number of users to skip for pagination.
 * @param {Record<string, any>} filter - The filter criteria to apply to the user query.
 * @param {Record<string, any>} sort - The sorting criteria to apply to the user query.
 * @returns {Promise<IUser[]>} - A promise that resolves to an array of user objects, excluding sensitive fields.
 */
export const getAllUsers = async (
  limit: number,
  offset: number,
  filter: Record<string, any>,
  sort: Record<string, any>,
): Promise<IUser[]> => {
  try {
    const notAllowedFields: Record<string, number> = {};
    commonVariables.USER_SENSITIVE_INFO_DB_COLUMNS.forEach((field) => {
      notAllowedFields[field] = 0;
    });
    // return await User.find(filter).sort(sort).skip(offset).limit(limit);
    const users = await User.aggregate([
      { $match: filter }, // Apply filter
      { $sort: sort }, // Apply sorting
      { $skip: offset }, // Apply offset for pagination
      { $limit: limit }, // Apply limit for pagination
      { $addFields: { id: '$_id' } }, // Add id field
      { $project: notAllowedFields }, // Exclude sensitive fields
    ]);
    return users;
  } catch (error) {
    logger.error(`Could not fetch users: ${error}`);
    return [];
  }
};

/**
 * Retrieves a user by email.
 * @param {string} email The email of the user to be retrieved.
 * @returns {Promise<IUser | null>} The user document if found or null if not found.
 */
export const getUserByEmail = async (email: string) => {
  return await User.findOne({
    email: email.toLowerCase(),
    isDeleted: false,
  });
};

/**
 * Retrieves a user by phone number.
 * @param {string} phoneNumber The phone number of the user to be retrieved.
 * @returns {Promise<IUser | null>} The user document if found or null if not found.
 */
export const getUserByPhone = async (phoneNumber: string) => {
  return await User.findOne({
    phoneNumber: phoneNumber,
    isDeleted: false,
  });
};

/**
 * Updates a user's information based on their email.
 * If provided, only fields that differ from the current values will be updated.
 * Special handling is included for updating the 'preferredTwoFAMethods' field.
 *
 * @param {string} email - The email of the user to be updated.
 * @param {Partial<IUser> | null} updates - The fields to update with their new values.
 * @returns {Promise<IUser | null>} - The updated user document, or null if the user was not found.
 */
export const updateUserByEmail = async (email: string, updates: Partial<IUser> | null) => {
  const userDoc: IUser | null = await getUserByEmail(email);
  if (!userDoc) return null;
  // Dynamically update fields only if the value has changed
  if (updates) {
    Object.keys(updates).forEach((key) => {
      if (userDoc[key] !== updates[key]) {
        // If we're updating 'preferredTwoFAMethods', handle it separately
        if (key === 'preferredTwoFAMethods') {
          // Check if the method already exists in the array
          const currentMethodType = updates[key]?.[0] ? updates[key][0].methodType : undefined;
          if (
            currentMethodType &&
            userDoc.preferredTwoFAMethods &&
            !userDoc.preferredTwoFAMethods.some((method: any) => method.methodType === currentMethodType)
          ) {
            // If the method is not already in the array, push it
            if (userDoc[key]) {
              userDoc[key].push(...(updates[key] ?? []));
            } else {
              userDoc[key] = updates[key];
            }
          }
        } else {
          // For other fields, update them normally
          userDoc[key] = updates[key];
        }
      }
    });
  }
  // Save the updated user document
  // Save the updated user document
  const updatedUserDoc = await userDoc.save();
  return modelToDomain(updatedUserDoc);
};
