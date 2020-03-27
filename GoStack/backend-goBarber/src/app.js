import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import Youch from 'youch';
import routes from './routes';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import path from 'path';



class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {

      if(process.env.NODE_ENV === 'development'){
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }else {
        return res.status(500).json({error: 'Internal Server Error'});
      }
      
    });
  }
}

export default new App().server;