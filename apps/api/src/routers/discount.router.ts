import discountController from '@/controllers/discount.controller';
import pointController from '@/controllers/point.controller';
import jwtGuard from '@/guards/jwt.guard';
import { Router } from 'express';

const discountRouter = Router();

discountRouter.get(
  '/discounts',
  jwtGuard.jwtVerifyToken,
  discountController.getDiscountsByOwnerId,
);

export default discountRouter;
