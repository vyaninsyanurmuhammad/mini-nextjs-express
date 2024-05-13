import pointController from '@/controllers/point.controller';
import jwtGuard from '@/guards/jwt.guard';
import { Router } from 'express';

const pointRouter = Router();

pointRouter.get(
  '/point',
  jwtGuard.jwtVerifyToken,
  pointController.getPointByOwnerId,
);

export default pointRouter;
