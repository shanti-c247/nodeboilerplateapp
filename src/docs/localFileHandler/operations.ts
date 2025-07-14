/**
 * @swagger
 * /local-files/upload:
 *  post:
 *    summary: Upload a file
 *    description: Allows a user to upload a file on local server.
 *    tags: [Local Files Handling]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/LocalUploadFileRequest'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/FileUploaded'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      422:
 *        $ref: '#/components/responses/UnprocessableEntity'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /local-files/{fileId}:
 *  get:
 *    summary: Get a specific file by ID
 *    description: Retrieve a specific file by its ID from local server.
 *    tags: [Local Files Handling]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: fileId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the file to fetch
 *    responses:
 *      200:
 *        $ref: '#/components/responses/FileFetched'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /local-files/:
 *  get:
 *    summary: List all files
 *    description: Retrieves a list of all files uploaded to the local server..
 *    tags: [Local Files Handling]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        $ref: '#/components/responses/FileListFetched'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

