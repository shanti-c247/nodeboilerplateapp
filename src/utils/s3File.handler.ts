import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import env from '@config/envVar';
import { fileHandlerMessages } from '@constants';
import multer from 'multer';

// Initialize AWS S3CLIENT
const s3Config = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * S3 storage configuration.
 */
export const s3Storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    // File upload path
    cb(null, 's3'); // Dummy destination, as we'll handle S3 directly in filename
  },
  filename: async (_req, file, cb) => {
    //Upload file name
    const fileName = `${Date.now().toString()}-${file.originalname}`;
    // Upload to S3
    const params = {
      Bucket: env.BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
    };

    try {
      await s3Config.send(new PutObjectCommand(params));
      cb(null, fileName);
    } catch (_err) {
      cb(new Error(fileHandlerMessages.S3_UPLOAD_ERROR), '');
    }
  },
});
