import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactRouters from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler} from './middlewares/notFoundHandler.js';

dotenv.config();

export const setupServer = () => {
  
  const app = express();

  app.use(cors());
  app.use(pino());
  app.use(contactRouters);
  app.use(errorHandler);
  app.use(notFoundHandler);

  const PORT = process.env.PORT || 3000;

  // app.use('*', (req, res) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });

  // app.use((err, req, res) => {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  // });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};