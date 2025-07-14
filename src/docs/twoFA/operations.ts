/**
 * @swagger
 * /two-factor-auth/active:
 *  post:
 *    summary: Enable two factor authentication
 *    description: Allows user to active TwoFA
 *    tags: [TwoFA]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ActiveTwoFactorAuthRequest'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/EnebleTwoFactorAuthResponse'
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
 * /two-factor-auth/send-otp:
 *  post:
 *    summary: Send otp to the user
 *    tags: [TwoFA]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SendEmailRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/SendEmailResponse'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
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
 * /two-factor-auth/verify-otp:
 *  patch:
 *    summary: Verify user and otp
 *    description: Verify TwoFA code and allow user with proper permission
 *    tags: [TwoFA]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/VerifyOtpRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/VerifyOtpResponse'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
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
 * /two-factor-auth/recover:
 *  post:
 *    summary: Validate 2FA recovery code
 *    description: Validate a recovery code for 2FA and allow user access if valid.
 *    tags: [TwoFA]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/VerifyCodeRquest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/VerifyCodeResponse'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
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
