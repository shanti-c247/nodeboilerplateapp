/**
 * @swagger
 * /user:
 *  post:
 *    summary: Create a new user
 *    description: Allows admin to create a new user
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserRequest'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/UserCreated'
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
 * /user/set-password:
 *  post:
 *    summary: Set user password
 *    description: Allows users to set password
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SetPasswordRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/UserPasswordUpdated'
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
 * /user:
 *  get:
 *    summary: Get all users
 *    description: Fetch a list of users with pagination using `page` and `limit` query parameters, along with optional search and sort parameters.
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: integer
 *      - in: query
 *        name: limit
 *        required: true
 *        schema:
 *          type: integer
 *      - in: query
 *        name: search
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: sortBy
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: orderBy
 *        required: false
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        $ref: '#/components/responses/UserListResponse'
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
 * /user/{userId}:
 *  get:
 *    summary: Get a specific user by ID
 *    description: Fetch all users if no ID is provided, otherwise fetch a specific user
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: Required user ID to fetch a specific user
 *    responses:
 *      200:
 *        $ref: '#/components/responses/UserResponse'
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
 * /user/{userId}:
 *  put:
 *    summary: Update a user's details
 *    description: Allows admin to update user information
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateUserRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/UserUpdated'
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
 * /user/change-status/{userId}:
 *  put:
 *    summary: Change user status
 *    description: Allows admin to change user status
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the user to be updated
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ChangeStatusRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/UserStatusUpdated'
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
 * /user/{userId}:
 *  delete:
 *    summary: Delete a user
 *    description: Allows admin to delete a user by their ID
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the user to be deleted
 *    responses:
 *      200:
 *        $ref: '#/components/responses/UserDeleted'
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
