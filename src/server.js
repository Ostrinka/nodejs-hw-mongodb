import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { Contact } from './models/contacts.js';

dotenv.config();

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());

  app.get('/contacts', async (req, res) => {
      try {
        const contacts = await Contact.find();
        res.status(200).json({
          status: 200,
          message: 'Successfully found contacts!',
          data: contacts,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    app.get('/contacts/:contactId', async (req, res) => {
      try {
        const { contactId } = req.params;
        const user = await Contact.findById(contactId);

        if (user === null) {
          return res.status(404).json({ status: 404, message: 'Contact not found' });
        }

        res.status(200).json({
          status: 200,
          message: `Successfully found contact with id ${contactId}!`,
          data: user,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};