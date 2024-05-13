import authController from '@/controllers/auth.controller';
import jwtGuard from '@/guards/jwt.guard';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup', authController.signUpUser);
authRouter.post(
  '/signup/organizer',
  jwtGuard.jwtVerifyToken,
  authController.signUpAsOrganizer,
);
authRouter.post('/signin', authController.signInUser);

export default authRouter;
