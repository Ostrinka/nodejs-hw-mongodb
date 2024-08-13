import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactRouters from './routers/contacts.js';
import authRouters from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler} from './middlewares/notFoundHandler.js';

dotenv.config();

export const setupServer = () => {
  
  const app = express();

  app.use(cookieParser());

  app.use(cors());
  app.use(
  pino({
    transport: {
      target: 'pino-pretty',
      },
    }),
  );
  app.use(authRouters);
  app.use(contactRouters);
  app.use(errorHandler);
  app.use(notFoundHandler);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};