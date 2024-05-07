import eventController from '@/controllers/event.controller';
import jwtGuard from '@/guards/jwt.guard';
import { Router } from 'express';

const eventRouter = Router();

// eventRouter.get('/events', eventController.getEvents);
eventRouter.post('/event', jwtGuard.jwtVerifyToken, eventController.addEvents);

export default eventRouter;
