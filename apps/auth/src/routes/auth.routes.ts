

import  {Router} from 'express';
import { validateBody } from 'shared';
import { loginSchema, registerSchema } from '../schemas/auth.schemas';
import * as authController from '../controllers/auth.controller'


export const authRouter=Router();



authRouter.post('/register',validateBody(registerSchema),authController.register);
authRouter.post('/login',validateBody(loginSchema),authController.login);



