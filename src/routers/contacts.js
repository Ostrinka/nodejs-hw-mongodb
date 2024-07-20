import { Router } from 'express';
import { getStudentsController, getStudentByIdController } from "../controllers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getStudentsController));

router.get('/contacts/:contactId', ctrlWrapper(getStudentByIdController));

export default router;