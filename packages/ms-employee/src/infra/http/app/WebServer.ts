import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { departamentRouter } from '@modules/departaments/infrastucture/http/router';
export interface WebServer {
  start(): void;
  getServer(): void;
  stop(): void;
}

export class ExpressServer implements WebServer {
  private server: express.Application;
  constructor() {
    this.server = express();
  }
  private initializeRouter = () => {
    this.server.use(departamentRouter);
    this.server.get('/favico.ico', (req, res) => {
      res.sendStatus(404);
    });
    this.server.get('/', (req, res) => {
      res.send('Welcome');
    });
  };
  private initializeMiddlewares = () => {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(bodyParser.json());
    this.server.use(cookieParser());
    this.server.use(ErrorMiddleware);
  };
  public getServer = () => {
    return this.server;
  };
  public start = async () => {
    this.initializeMiddlewares();
    this.initializeRouter();
    this.server.listen(3000, () => {
      console.log('this server is ready on port 3000');
    });
  };
  public stop = (): void => {
    throw new Error('Method not implemented.');
  };
}
