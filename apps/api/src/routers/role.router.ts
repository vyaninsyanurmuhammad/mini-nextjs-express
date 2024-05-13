import roleController from '@/controllers/role.controller';
import { Router } from 'express';

const roleRouter = Router();

roleRouter.get('/roles', roleController.getRoles);
roleRouter.post('/role', roleController.addRole);

export default roleRouter;
