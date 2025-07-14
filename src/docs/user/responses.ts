// constants
import { userMessages } from '@constants';

// utils
import { swaggerHandler } from '@utils';

const userResponses = {
  UserCreated: swaggerHandler.createSuccessResponse(userMessages.USER_CREATED_AND_EMAIL_SENT, {
    $ref: '#/components/schemas/User',
  }),
  UserUpdated: swaggerHandler.createSuccessResponse(userMessages.USER_UPDATED_SUCCESS, {
    $ref: '#/components/schemas/User',
  }),
  UserDeleted: swaggerHandler.createSuccessResponse(userMessages.USER_DELETE_SUCCESS, {
    $ref: '#/components/schemas/User',
  }),
  UserListResponse: swaggerHandler.createSuccessResponse(
    userMessages.USERS_FETCH_SUCCESS,
    swaggerHandler.createListResponse(
      {
        $ref: '#/components/schemas/User',
      },
      userMessages.USERS_FETCH_SUCCESS,
    ),
  ),
  UserResponse: swaggerHandler.createSuccessResponse(userMessages.USER_FETCH_SUCCESS, {
    $ref: '#/components/schemas/User',
  }),
  UserStatusUpdated: swaggerHandler.createSuccessResponse(userMessages.USER_STATUS_UPDATED, null),
  UserPasswordUpdated: swaggerHandler.createSuccessResponse(userMessages.USER_PASSWORD_SET_SUCCESS, null),
};

export default userResponses;
