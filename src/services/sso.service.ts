import { NOT_FOUND, OK, ssoMessages } from '@constants';
import type { IApiResponse, IUser } from '@customTypes';
import { User } from '@models';
import { generateTokenHandler } from '@utils';
import type { Response } from 'express';

/**
 * Generate token after successfully authenticated by sso-support.
 * @param {Request} req Express request object
 * @returns {Promise<IApiResponse>} Response containing the token and user role detail or error information
 */
export const ssoLogin = async (user: IUser, res: Response): Promise<IApiResponse> => {
  const checkUser = await User.findOne({ email: user.email }, 'name email role');

  if (!checkUser) {
    return {
      status: NOT_FOUND,
      success: false,
      message: ssoMessages.SSO_USER_NOT_FOUND,
      data: null,
    };
  }

  const payload = {
    id: checkUser.id,
    name: checkUser.name,
    email: checkUser.email,
    role: checkUser.role,
  };

  return {
    status: OK,
    success: true,
    message: ssoMessages.SSO_LOGIN_SUCCESS,
    data: { token: await generateTokenHandler.generateAuthToken(res, payload), role: checkUser.role },
  };
};
