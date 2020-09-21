import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { CreateDepartament } from '../../departaments/controllers/CreateDepartament';
export interface WebServer {
  start(): void;
}
const controllers = [new CreateDepartament()];
export class ExpressServer implements WebServer {
  private server: express.Application;
  constructor() {
    this.server = express();
  }
  private initializeMiddlewares = () => {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(bodyParser.json());
    this.server.use(cookieParser());
    this.server.use(ErrorMiddleware);
    this.server.get('/favico.ico', (req, res) => {
      res.sendStatus(404);
    });
    this.server.get('/', (req, res) => {
      res.send('Welcome');
    });
  };
  private initializeControllers = () => {
    controllers.forEach(controller => {
      if (!controller.getRouter()) return;
      this.server.use('/', controller.getRouter());
    });
  };
  public start = (): void => {
    this.initializeMiddlewares();
    this.initializeControllers();
    this.server.listen(3001, () => {
      console.log('this server is ready on port 3001');
    });
  };
}
