import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(rateLimiter);
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use('/', routes);
app.use(errors());
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
