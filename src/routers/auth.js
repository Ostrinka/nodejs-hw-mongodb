import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema, requestResetEmailSchema } from '../validation/auth.js';
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController, requestResetEmailController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';


const router = express.Router();
const jsonParser = express.json();

router.post('/auth/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/auth/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/auth/refresh', jsonParser, ctrlWrapper(refreshUserSessionController));

router.post('/auth/logout', jsonParser, ctrlWrapper(logoutUserController));

router.post('/auth/send-reset-email', jsonParser, validateBody(requestResetEmailSchema),ctrlWrapper(requestResetEmailController),
);

export default router;