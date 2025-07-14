/**
 * @swagger
 * /data-management/upload:
 *   post:
 *     summary: Upload a CSV file and process its data
 *     tags:
 *       - Data Management
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UploadFileRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UploadFile'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       422:
 *        $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /data-management/download/file:
 *   get:
 *     summary: Download a file as a CSV
 *     tags:
 *       - Data Management
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional query parameter to filter or specify data
 *       - in: query
 *         name: batchId
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional query parameter to filter or specify data
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional query parameter to filter or specify data
 *       - in: query
 *         name: companyName
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional query parameter to filter or specify data
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *         headers:
 *           Content-Type:
 *             description: The type of the file being returned
 *             schema:
 *               type: string
 *           Content-Disposition:
 *             description: The name of the file being downloaded
 *             schema:
 *               type: string
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *             example: "id,name,email\n1,John Doe,john@example.com\n2,Jane Doe,jane@example.com"
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
 * /data-management/download/pdf:
 *   get:
 *     summary: Download a PDF file
 *     tags:
 *       - Data Management
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional query parameter to filter or specify data
 *       - in: query
 *         name: batchId
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional query parameter to filter or specify data
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional query parameter to filter or specify data
 *       - in: query
 *         name: companyName
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional query parameter to filter or specify data
 *     responses:
 *       200:
 *         description: PDF file generated and downloaded successfully
 *         headers:
 *           Content-Type:
 *             description: The type of the file being returned
 *             schema:
 *               type: string
 *               example: application/pdf
 *           Content-Disposition:
 *             description: The name of the file being downloaded
 *             schema:
 *               type: string
 *               example: attachment; filename="data_report.pdf"
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
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
 * /data-management/batches:
 *   get:
 *     summary: Retrieve a list of batches with their details
 *     tags:
 *       - Data Management
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetBatches'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /data-management/batches/{batchId}/dataItems:
 *   delete:
 *     summary: Delete a batch and its associated data items
 *     tags:
 *       - Data Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: batchId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the batch to delete
 *     responses:
 *       204:
 *         description: Successfully deleted the batch and associated data items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
