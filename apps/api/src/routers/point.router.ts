import pointController from "@/controllers/point.controller";
import { Router } from 'express';

const pointRouter = Router();

pointRouter.get('/point/:id', pointController.getPointByOwnerId);

export default pointRouter;
