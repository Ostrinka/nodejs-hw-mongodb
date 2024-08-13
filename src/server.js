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

console.log('SMTP Configuration:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD,
  fromEmail: process.env.SMTP_FROM_EMAIL,
});

export const setupServer = () => {
  
  const app = express();

  app.use(cookieParser());

  app.use(cors());
  app.use(pino());
  app.use(authRouters);
  app.use(contactRouters);
  app.use(errorHandler);
  app.use(notFoundHandler);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};