import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';


const router = express.Router();
const jsonParser = express.json();

router.post('/auth/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/auth/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/auth/refresh', jsonParser, ctrlWrapper(refreshUserSessionController));

router.post('/auth/logout', jsonParser, ctrlWrapper(logoutUserController));

export default router;