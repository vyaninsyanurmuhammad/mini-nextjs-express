import eventController from '@/controllers/event.controller';
import jwtGuard from '@/guards/jwt.guard';
import { uploader } from '@/helpers/uploader';
import { Router } from 'express';

const eventRouter = Router();

eventRouter.get('/events/locations', eventController.getLocations);
eventRouter.get('/events/search', eventController.findEvents);
eventRouter.get('/events', eventController.getEvents);
eventRouter.get('/event/:id', eventController.getEventbyId);
eventRouter.post(
  '/event/:id/buy',
  jwtGuard.jwtVerifyToken,
  eventController.buyEvent,
);
eventRouter.get(
  '/tickets/active',
  jwtGuard.jwtVerifyToken,
  eventController.getTransactionActive,
);
eventRouter.get(
  '/tickets/active/:id',
  jwtGuard.jwtVerifyToken,
  eventController.getTransactionActiveDetail,
);
eventRouter.get(
  '/tickets/transaction',
  jwtGuard.jwtVerifyToken,
  eventController.getTransactions,
);
eventRouter.get(
  '/tickets/transaction/:id',
  jwtGuard.jwtVerifyToken,
  eventController.getTransactionDetail,
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
eventRouter.get(
  '/store/events/inactive/:id',
  jwtGuard.jwtVerifyToken,
  eventController.getStoreEventsInactiveById,
);
eventRouter.post(
  '/store/event',
  jwtGuard.jwtVerifyToken,
  uploader('IMG', '/images').single('file'),
  jwtGuard.jwtVerifyToken,
  eventController.addEvent,
);

export default eventRouter;
