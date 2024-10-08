import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import swaggerUi from 'swagger-ui-express';
import swaggerSetup from '../../../swagger.json';

import { AppError } from '@shared/errors/AppError';
import { router } from './routes';

import '@shared/container';

import createConnection from '@shared/infra/typeorm';
import upload from '@config/upload';

createConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${error.message}`,
    });
  },
);

export { app };
