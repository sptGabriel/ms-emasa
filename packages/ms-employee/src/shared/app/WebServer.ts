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
import { MikroClient, ORM } from './OrmClient';
import { container, inject, singleton } from 'tsyringe';
export interface WebServer {
  start(): void;
  getServer(): void;
  stop(): void;
}

export class ExpressServer implements WebServer {
  private server: express.Application;
  private Orm: ORM;
  constructor() {
    this.Orm = container.resolve(MikroClient);
    this.server = express();
  }
  private initializeMiddlewares = () => {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(bodyParser.json());
    this.server.use(cookieParser());
    this.server.use(ErrorMiddleware);
    this.server.use((req, res, next) => {
      RequestContext.create(this.Orm.getConnection().em, next);
    });
    this.server.get('/favico.ico', (req, res) => {
      res.sendStatus(404);
    });
    this.server.get('/', (req, res) => {
      res.send('Welcome');
    });
  };
  public getServer = () => {
    return this.server;
  };
  public start = async () => {
    await this.Orm.start();
    this.initializeMiddlewares();
    this.server.listen(3000, () => {
      console.log('this server is ready on port 3000');
    });
  };
  public stop = (): void => {
    throw new Error('Method not implemented.');
  };
}
