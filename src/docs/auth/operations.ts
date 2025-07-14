/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Create a new user
 *    description: Use can register our self.
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AuthCreateUserRequest'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/AuthUserCreated'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/Conflict'
 *      422:
 *        $ref: '#/components/responses/UnprocessableEntity'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/verify-email:
 *  post:
 *    summary: Verify user email
 *    description: Verify the user's email address to complete registration by providing a token.
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/VerifyEmailRequest'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/UserVerified'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/Conflict'
 *      422:
 *        $ref: '#/components/responses/UnprocessableEntity'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login a user
 *    description: User can login with user credentials.
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/UserLoggedIn'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/Conflict'
 *      422:
 *        $ref: '#/components/responses/UnprocessableEntity'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/update-profile:
 *  put:
 *    summary: Update user profile
 *    description: User can update there profile.
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateProfilerRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/UserProfileUpdated'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/Conflict'
 *      422:
 *        $ref: '#/components/responses/UnprocessableEntity'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/forgot-password:
 *  post:
 *    summary: User forget password
 *    description: Forget password by sending an email.
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ForgetPasswordRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/UserForgetPassword'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/Conflict'
 *      422:
 *        $ref: '#/components/responses/UnprocessableEntity'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/reset-password:
 *  post:
 *    summary: Reset user password
 *    description: Reset user password by email link.
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ResetPasswordRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/UserResetPassword'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/Conflict'
 *      422:
 *        $ref: '#/components/responses/UnprocessableEntity'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/me:
 *  get:
 *    summary: Get user profile
 *    description: Fetch user profile for logged in user.
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        $ref: '#/components/responses/AuthUserResponse'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/Conflict'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/change-password:
 *  post:
 *    summary: Change Password
 *    description: Change password by logged in user.
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ChangePasswordRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/UserChangePassword'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/Conflict'
 *      422:
 *        $ref: '#/components/responses/UnprocessableEntity'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/resend-verification:
 *  post:
 *    summary: Resend email verification
 *    description: Resends the verification email to the user.
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ResendVerificationRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/VerificationResent'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/logout:
 *  post:
 *    summary: Logout user
 *    description: Logs out the currently authenticated user.
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        $ref: '#/components/responses/LogoutSuccess'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
