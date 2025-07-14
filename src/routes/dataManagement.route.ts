import { dataManagementController } from '@controllers';
import { authenticate } from '@middlewares';
import { dataManagementHandler } from '@utils';
import express from 'express';

const router = express.Router();

// Upload CSV and Process Data
router.post('/upload', authenticate, dataManagementHandler.uploadFile, dataManagementController.uploadFile);

// Download CSV
router.get('/download/file', authenticate, dataManagementController.downloadFile);

// Download PDF
router.get('/download/pdf', authenticate, dataManagementController.downloadPdf);

router.get('/batches', authenticate, dataManagementController.getBatches);

//Delete Data
router.delete('/batches/:batchId/dataItems', authenticate, dataManagementController.deleteDataItemsByBatch);

export default router;
