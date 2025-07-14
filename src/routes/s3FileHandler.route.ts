import { s3FileHandlerController } from '@controllers';
import { authenticate, uploadFileS3 } from '@middlewares';
import express from 'express';

const router = express.Router();

// Apply the authentication middleware to all routes in this group
router.get('/:fileId', authenticate, s3FileHandlerController.fetchS3File);
router.get('/', authenticate, s3FileHandlerController.fetchS3FileList);
router.post('/upload', authenticate, uploadFileS3, s3FileHandlerController.s3FileUpload);

export default router;
