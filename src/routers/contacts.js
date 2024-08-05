import express from 'express';
import { getContactsController, getContactByIdController, createContactController, patchContactController, deleteContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';


const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.get('/contacts', authenticate, ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', authenticate, isValidId, ctrlWrapper(getContactByIdController));

router.post('/contacts', authenticate, jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', authenticate, jsonParser, isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', authenticate, isValidId, ctrlWrapper(deleteContactController));

export default router;