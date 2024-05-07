import categoryController from '@/controllers/category.controller';
import { Router } from 'express';

const categoryRouter = Router();

categoryRouter.get('/roles', categoryController.getCategories);
categoryRouter.post('/role', categoryController.addCategory);

export default categoryRouter;
