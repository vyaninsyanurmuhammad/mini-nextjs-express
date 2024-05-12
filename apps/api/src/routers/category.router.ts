import categoryController from '@/controllers/category.controller';
import { Router } from 'express';

const categoryRouter = Router();

categoryRouter.get('/categories', categoryController.getCategories);
categoryRouter.post('/category', categoryController.addCategory);

export default categoryRouter;
