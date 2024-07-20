import { Router } from 'express';
import { getStudentsController, getStudentByIdController } from "../controllers/contacts.js";

const router = Router();

router.get('/contacts', getStudentsController);

router.get('/contacts/:contactId', getStudentByIdController);

export default router;