import eventController from '@/controllers/event.controller';
import jwtGuard from '@/guards/jwt.guard';
import { uploader } from '@/helpers/uploader';
import { Router } from 'express';

const eventRouter = Router();

// eventRouter.get('/events', eventController.getEvents);
eventRouter.post(
  '/event',
  jwtGuard.jwtVerifyToken,
  uploader('IMG', '/images').single('file'),
  jwtGuard.jwtVerifyToken,
  eventController.addEvent,
);

export default eventRouter;
