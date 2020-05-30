import 'reflect-metadata';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use('/', routes);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'Error',
      message: 'Internal Server Error'
    });
  }
);

app.listen(3333, () => {
  console.log('👨‍💻️ Estável! Foco! Atenção!');
});
