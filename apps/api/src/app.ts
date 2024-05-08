import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import roleRouter from './routers/role.router';
import authRouter from './routers/auth.router';
import pointRouter from './routers/point.router';
import discountRouter from './routers/discount.router';
import eventRouter from './routers/event.router';
import * as path from 'path';

function configureApp(): Express {
  const app = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  return app;
}

function handleError(app: Express): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.includes('/api/')) {
      res.status(404).send('Not found !');
    } else {
      next();
    }
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (req.path.includes('/api/')) {
      console.error('Error : ', err.stack);
      res.status(500).send('Error !');
    } else {
      next();
    }
  });
}

function setRoutes(app: Express): void {
  app.get('/', (req: Request, res: Response) => {
    res.send(`Hello, Purwadhika Student !`);
  });
  app.use('/role-management/', roleRouter);
  app.use('/point-management/', pointRouter);
  app.use('/discount-management/', discountRouter);
  app.use('/event-management/', eventRouter);
  app.use('/auth-management/', authRouter);

  app.use(express.static(path.join(__dirname, '../public')));
}

function startServer(app: Express): void {
  app.listen(PORT, () => {
    console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
  });
}

export function main() {
  const app = configureApp();
  handleError(app);
  setRoutes(app);
  startServer(app);
}

// export default class App {
//   private app: Express;

//   constructor() {
//     this.app = express();
//     this.configure();
//     this.routes();
//     this.handleError();
//   }

//   private configure(): void {
//     this.app.use(cors());
//     this.app.use(json());
//     this.app.use(urlencoded({ extended: true }));
//   }

//   private handleError(): void {
//     // not found
//     this.app.use((req: Request, res: Response, next: NextFunction) => {
//       if (req.path.includes('/api/')) {
//         res.status(404).send('Not found !');
//       } else {
//         next();
//       }
//     });

//     // error
//     this.app.use(
//       (err: Error, req: Request, res: Response, next: NextFunction) => {
//         if (req.path.includes('/api/')) {
//           console.error('Error : ', err.stack);
//           res.status(500).send('Error !');
//         } else {
//           next();
//         }
//       },
//     );
//   }

//   private routes(): void {
//     this.app.get('/', (req: Request, res: Response) => {
//       res.send(`Hello, Purwadhika Student !`);
//     });
//   }

//   public start(): void {
//     this.app.listen(PORT, () => {
//       console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
//     });
//   }
// }
