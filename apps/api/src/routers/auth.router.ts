import authController from "@/controllers/auth.controller";
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup', authController.signUpUser);
authRouter.post('/signin', authController.signInUser);

export default authRouter;
