/**
 * @swagger
 * /redis/{id}:
 *   post:
 *     summary: Save data
 *     tags:
 *       - Redis
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Required params parameter to save data
 *     responses:
 *       200:
 *         description: Save data successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /redis/{id}:
 *   get:
 *     summary: Get data
 *     tags:
 *       - Redis
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Required params parameter to get data
 *     responses:
 *       200:
 *         description: Get data successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /redis/{id}:
 *   delete:
 *     summary: Delete data with Id
 *     tags:
 *       - Redis
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Required params parameter to delete id
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /redis:
 *  get:
 *    summary: Get all users
 *    description: Fetch a list of users with pagination using `page` and `limit` query parameters, along with optional search and sort parameters.
 *    tags: [Redis]
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
 *        $ref: Get data successfully
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
