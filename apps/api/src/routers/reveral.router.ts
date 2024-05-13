import reveralController from '@/controllers/reveral.controller';
import jwtGuard from '@/guards/jwt.guard';
import { Router } from 'express';

const reveralRouter = Router();

reveralRouter.get(
  '/reveral',
  jwtGuard.jwtVerifyToken,
  reveralController.getReveral,
);
// reveralRouter.post('/reveral', roleController.addRole);

export default reveralRouter;
