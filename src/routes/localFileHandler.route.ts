import express from 'express';

import { localFileHandlerController } from '@controllers';
import { authenticate, uploadFileLocal } from '@middlewares';

const router = express.Router();

// Apply the authentication middleware to all routes in this group
router.get('/:fileId', authenticate, localFileHandlerController.fetchLocalFile);
router.get('/', authenticate, localFileHandlerController.fetchLocalFileList);
router.post('/upload', authenticate, uploadFileLocal, localFileHandlerController.localFileUpload);

export default router;
