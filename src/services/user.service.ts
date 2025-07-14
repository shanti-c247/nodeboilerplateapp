//Constants

import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  NO_CONTENT,
  OK,
  SERVER_ERROR,
  commonMessages,
  emailTemplatesVariables,
  userMessages,
} from '@constants';

//Utils
// notificationHandler
import { authHandler, emailHandler, paginationHandler, userHandler } from '@utils';

//Models

//Enums
// NotificationPriority, NotificationType,
import { Role, UserStatus } from '@enums';

import { logger } from '@config/index';
//Types
import type { UnifiedUserServiceResponse } from '@customTypes';
import { User } from '@models';
import { userCommonService } from '@services';

/**
 * Handles user creation
 * @param {Request} req Express request object
 * @returns {Promise<CreateUserResponse>} Response containing the created user or error information
 */
export const createUser = async (name: string, email: string, phoneNumber: string, countryCode: string): Promise<UnifiedUserServiceResponse> => {
  if (await userCommonService.checkIfUserExists(email)) {
    return {
      status: CONFLICT,
      success: false,
      message: commonMessages.USER_ALREADY_EXISTS,
      data: null,
    };
  }

  const { hashedToken, expireDate, token } = await userHandler.generateSetPasswordToken();
  const newUser = new User({
    name,
    email,
    phoneNumber,
    countryCode,
    status: UserStatus.Inactive,
    resetPasswordToken: hashedToken,
    resetPasswordExpire: expireDate,
  });
  const createdUser = await newUser.save();
  logger.log(`token: ${token}`);

  const emailInfo = await emailHandler.sendEmailBySlug({
    toEmail: email,
    toName: `${createdUser.name}`,
    templateName: emailTemplatesVariables.emailTemplates[0].slug,
    data: { token },
  });
  return {
    status: CREATED,
    success: true,
    message: emailInfo ? userMessages.USER_CREATED_AND_EMAIL_SENT : userMessages.USER_CREATED_AND_EMAIL_NOT_SENT,
    data: createdUser,
  };
};

/**
 * Retrieves users from the database.
 * If a userId is provided, fetch that specific user; otherwise, fetch all users.
 * @param {Request} req Express request object
 * @returns {Promise<GetUsersResponse>} Response containing the user(s) or error information
 */
export const getUsers = async (
  userId: string,
  pageNumber: number,
  pageSize: number,
  search: string | any,
  sortBy: string | any, // -1 , 1,
  orderBy: string | any,
): Promise<UnifiedUserServiceResponse> => {
  if (userId) {
    const user = await userCommonService.getUserById(userId);
    return {
      status: user ? OK : BAD_REQUEST,
      success: Boolean(user),
      message: user ? userMessages.USER_FETCH_SUCCESS : commonMessages.USER_NOT_FOUND,
      data: user || null,
    };
  }
  // get pagination for manage pagination records
  const { limit, offset } = paginationHandler.getPagination(pageNumber, pageSize);
  /**
   * Manage sorting and pagination
   */
  // /sort_by = createdAt
  // order = asc || desc
  let sort: Record<string, any> = { createdAt: -1 };
  const order = orderBy ? orderBy : 'createdAt';
  if (sortBy || order) {
    orderBy = orderBy === 'asc' ? 1 : -1;
    sort = { [sortBy]: orderBy };
  }
  const filter: Record<string, any> = {
    role: Role.User,
  };
  if (search) {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    filter['name'] = { $regex: search, $options: 'i' };
  }
  const users = await userCommonService.getAllUsers(limit, offset, filter, sort);
  // Fetch total count for pagination metadata
  const total = await User.countDocuments({ role: Role.User });
  return {
    status: OK,
    success: true,
    message: userMessages.USERS_FETCH_SUCCESS,
    data: { total: total, users: users },
  };
};

/**
 * Deletes a user from the database based on the provided user ID.
 * @param {Request} req Express request object
 * @returns {Promise<DeleteUserResponse>} Response containing the deletion result or error information
 */
export const deleteUser = async (userId: string): Promise<UnifiedUserServiceResponse> => {
  const user = await User.findByIdAndDelete(userId);
  return {
    status: user ? NO_CONTENT : BAD_REQUEST,
    success: !!user,
    message: user ? userMessages.USER_DELETE_SUCCESS : commonMessages.USER_NOT_FOUND,
    data: null,
  };
};

/**
 * Service to update a user's information (name, email, role, status only)
 * @param {Request} req Express request object
 * @returns {Promise<UpdateUserResponse>} Response containing the updated user or error information
 */
export const updateUser = async (
  userId: string,
  name: string,
  email: string,
  phoneNumber: string,
  countryCode: string,
  role: number,
  status: number,
): Promise<UnifiedUserServiceResponse> => {
  const user = await userCommonService.getUserById(userId);
  if (!user)
    return {
      status: BAD_REQUEST,
      success: false,
      message: commonMessages.USER_NOT_FOUND,
      data: null,
    };

  if (email && email !== user.email && (await userCommonService.checkIfUserExists(email)))
    return {
      status: CONFLICT,
      success: false,
      message: commonMessages.USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
      data: null,
    };
  Object.assign(user, {
    name: name || user.name,
    email: email || user.email,
    phoneNumber: phoneNumber || user.phoneNumber,
    countryCode: countryCode || user.countryCode,
    role: role || user.role,
    status: status || user.status,
  });
  // await notificationHandler.sendNotification({
  //   recipientId: req?.user?.id,
  //   type: NotificationType.NOTIFICATION,
  //   title: userMessages.USER_UPDATE_NOTIFICATION.title,
  //   message: userMessages.USER_UPDATE_NOTIFICATION.message,
  //   priority: NotificationPriority.MEDIUM,
  // });
  const updatedUser = await user.save();

  return {
    status: OK,
    success: true,
    message: userMessages.USER_UPDATED_SUCCESS,
    data: updatedUser,
  };
};

/**
 * Handles user password change
 * @param {Request} req Express request object
 * @returns {Promise<SetPasswordResponse>} Response containing the updated user or error information
 */
export const setPassword = async (token: string, password: string): Promise<UnifiedUserServiceResponse> => {
  const hashedToken = await userHandler.generateHashedToken(token);
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: new Date() },
  });
  if (!user || (user.resetPasswordExpire && user.resetPasswordExpire < new Date())) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: user ? userMessages.USER_SET_PASSWORD_LINK_EXPIRED : userMessages.USER_SET_PASSWORD_LINK_INVALID,
      data: null,
    };
  }

  const hashedPassword = await authHandler.hashPassword(password);
  user.password = hashedPassword;
  user.status = UserStatus.Active;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return {
    status: OK,
    success: true,
    message: userMessages.USER_PASSWORD_SET_SUCCESS,
    data: null,
  };
};

/**
 * Handles user status change
 * @param {Request} req Express request object
 * @returns {Promise<UnifiedUserServiceResponse>} Response containing the updated user or error information
 */
export const changeStatus = async (userId: string, status: number): Promise<UnifiedUserServiceResponse> => {
  const user = await userCommonService.getUserById(userId);
  if (!user) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: commonMessages.USER_NOT_FOUND,
      data: null,
    };
  }
  user.status = status;
  const updatedUser = await user.save();

  return {
    status: updatedUser ? OK : SERVER_ERROR,
    success: !!updatedUser,
    message: updatedUser ? userMessages.USER_STATUS_UPDATED : commonMessages.USER_NOT_FOUND,
    data: null,
  };
};
