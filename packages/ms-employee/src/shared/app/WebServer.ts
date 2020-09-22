import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middlewares/error.middleware';
import {
  Connection,
  IDatabaseDriver,
  MikroORM,
  RequestContext,
} from '@mikro-orm/core';
import { MikroClient } from './OrmClient';
import { inject } from 'tsyringe';
export interface WebServer {
  start(): void;
  getServer(): void;
  stop(): void;
}

export class ExpressServer implements WebServer {
  private server: express.Application;
  // private mikroORMConnection: MikroORM<IDatabaseDriver<Connection>>;
  constructor(@inject(MikroClient) private database: MikroClient) {
    this.server = express();
  }
  // private initializeDatabase = async () => {
  //   this.mikroORMConnection = await MikroORM.init(config);
  //   const migrator = await this.mikroORMConnection.getMigrator();
  //   const migrations = await migrator.getPendingMigrations();
  //   if (!(migrations && migrations.length > 0)) return;
  //   await migrator.up();
  // };
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
    this.server.use((req, res, next) => {
      RequestContext.create(this.database?.getConnection().em, next);
    });
  };
  // private initializeControllers = () => {
  //   controllers.forEach(controller => {
  //     if (!controller.getRouter()) return;
  //     this.server.use('/', controller.getRouter());
  //   });
  // };
  public getServer = () => {
    return this.server;
  };
  public start = () => {
    this.initializeMiddlewares();
    this.server.listen(3000, () => {
      console.log('this server is ready on port 3000');
    });
  };
  public stop = (): void => {
    throw new Error('Method not implemented.');
  };
}
