/**
 * @swagger
 * tags:
 *   - name: SSO
 *     description: SSO Authentication routes for Google and Facebook.
 */

/**
 * @swagger
 * /sso/login:
 *   post:
 *     summary: Initiate SSO login
 *     description: Starts SSO login via a configured provider.
 *     tags: [SSO]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SSOLoginRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SSOLoginSuccess'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *        $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /sso/google/callback:
 *   get:
 *     summary: Google SSO Callback
 *     description: Handles Google SSO authentication response.
 *     tags: [SSO]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GoogleCallback'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /sso/facebook/callback:
 *   get:
 *     summary: Facebook SSO Callback
 *     description: Handles Facebook SSO authentication response.
 *     tags: [SSO]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/FacebookCallback'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /sso/me:
 *   get:
 *     summary: Fetch authenticated user profile
 *     description: Returns the authenticated user's profile.
 *     tags: [SSO]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SSOProfileFetched'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
