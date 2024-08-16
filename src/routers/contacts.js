import express from 'express';
import { getContactsController, getContactByIdController, createContactController, patchContactController, deleteContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.get('/contacts', authenticate, ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', authenticate, isValidId, ctrlWrapper(getContactByIdController));

router.post('/contacts', authenticate, jsonParser, upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', authenticate, jsonParser, upload.single('photo'), isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', authenticate, isValidId, ctrlWrapper(deleteContactController));

export default router;