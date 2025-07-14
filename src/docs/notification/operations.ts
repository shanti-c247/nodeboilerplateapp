/**
 * @swagger
 * /notification:
 *  get:
 *    summary: Retrieve a list of notifications
 *    description: Fetch a list of notifications for the authenticated user, specifying the page number and the limit per page.
 *    tags: [Notifications]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: false
 *         description: The page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         required: false
 *         description: The number of notifications to return per page (default is 10).
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum:
 *             - all
 *             - system_alert
 *             - notification
 *             - broadcast
 *         required: false
 *         description: Filter notifications by type (e.g., "all" or "notifications").
 *    responses:
 *      200:
 *        $ref: '#/components/responses/NotificationList'
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
