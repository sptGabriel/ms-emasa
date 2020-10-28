import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { AppError } from './BaseError';
import { DepartamentController } from '@modules/departaments/infrastucture';
import { container } from 'tsyringe';
import { BaseController } from 'shared/core/infra/base-controller';
import { EmployeeController } from '@modules/employees/infrastucture';
import { SupplyController } from '@modules/supply/infrastucture';
import { ProductController } from '@modules/products/infrastucture/product.controller';
import { ContractController } from '@modules/contracts/infrastucture/contract.controller';
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
    this.server.use(
      '/',
      container.resolve<BaseController>(DepartamentController).getRouter(),
    );
    this.server.use(
      '/',
      container.resolve<BaseController>(EmployeeController).getRouter(),
    );
    this.server.use(
      '/',
      container.resolve<BaseController>(SupplyController).getRouter(),
    );
    this.server.use(
      '/',
      container.resolve<BaseController>(ProductController).getRouter(),
    );
    this.server.use(
      '/',
      container.resolve<BaseController>(ContractController).getRouter(),
    );
    this.server.get('/favico.ico', (req, res) => {
      res.sendStatus(404);
    });
    this.server.get('/', (req, res) => {
      res.send('Welcome');
    });
  };
  private initializeErrorHandling() {
    this.server.use(ErrorMiddleware);
  }
  private initializeMiddlewares = () => {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(bodyParser.json());
    this.server.use(cookieParser());
  };
  public getServer = () => {
    return this.server;
  };
  public start = async () => {
    this.initializeMiddlewares();
    this.initializeRouter();
    this.initializeErrorHandling();
    this.server.listen(3000, () => {
      console.log('this server is ready on port 3000');
    });
  };
  public stop = (): void => {
    throw new Error('Method not implemented.');
  };
}
