import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';

interface IUpload {
  storageDriver: 's3' | 'disk';
  bucketName: string;
  tmpFolder: string;
  uploadFolder: string;
  multer: {
    storage: StorageEngine;
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadFolder = path.resolve(tmpFolder, 'uploads');

export default {
  storageDriver: process.env.STORAGE_DRIVER,
  bucketName: process.env.AWS_S3_BUCKET,
  tmpFolder,
  uploadFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (req, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      }
    })
  }
} as IUpload;
