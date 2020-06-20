import { container } from 'tsyringe';

import configUpload from '@config/upload';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[configUpload.storageDriver]
);
