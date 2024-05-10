import eventController from '@/controllers/event.controller';
import jwtGuard from '@/guards/jwt.guard';
import { uploader } from '@/helpers/uploader';
import { Router } from 'express';

const eventRouter = Router();

eventRouter.get('/events', eventController.getEvents);
eventRouter.get('/event/:id', eventController.getEventbyId);
eventRouter.post(
  '/event/:id/buy',
  jwtGuard.jwtVerifyToken,
  eventController.buyEvent,
);
eventRouter.get(
  '/store/events/active',
  jwtGuard.jwtVerifyToken,
  eventController.getStoreEventsActive,
);
eventRouter.get(
  '/store/events/active/:id',
  jwtGuard.jwtVerifyToken,
  eventController.getStoreEventsActiveById,
);
eventRouter.get(
  '/store/events/inactive',
  jwtGuard.jwtVerifyToken,
  eventController.getStoreEventsInactive,
);
eventRouter.post(
  '/store/event',
  jwtGuard.jwtVerifyToken,
  uploader('IMG', '/images').single('file'),
  jwtGuard.jwtVerifyToken,
  eventController.addEvent,
);


export default eventRouter;
