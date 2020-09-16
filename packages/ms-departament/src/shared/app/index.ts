import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import { TypeOrmFactory, TypeOrm } from './TypeOrm/index';
import { Middlewares } from './Middleware';
import { MiddlewareFactory } from './MiddlewareFactory';
import { ErrorMiddleware } from './middlewares/error.middleware';
import configOrm from './TypeOrm/ormconfig';
import {
  IController,
  ControllerManagerFactory,
  Controller,
} from './Controller';
import { Connection, getConnection } from 'typeorm';
import { container } from 'tsyringe';
const middlewareFactory = new MiddlewareFactory();
const ormFactory = new TypeOrmFactory();
class controller1 implements IController {
  getPath(): string {
    throw new Error('Method not implemented.');
  }
  getRouter(): express.Router {
    throw new Error('Method not implemented.');
  }
}
class controller2 implements IController {
  getPath(): string {
    throw new Error('Method not implemented.');
  }
  getRouter(): express.Router {
    throw new Error('Method not implemented.');
  }
}
middlewareFactory.registryMiddlewares([
  cors(),
  bodyParser.json(),
  express.json(),
  cookieParser(),
  ErrorMiddleware,
]);
ormFactory.setConfig(configOrm);
ormFactory.newOrmConnection();
const controllerManagerFactory = new ControllerManagerFactory();
controllerManagerFactory.setControllers([
  (new controller1(), new controller2()),
]);
export class BootstrapApplication {
  public application: express.Application;
  public orm: TypeOrm;
  public middlewares: Middlewares;
  public controllerManager: Controller;
  // private controllers: IController[];
  constructor(
    orm: TypeOrm,
    middlewares: Middlewares,
    controllerManager: Controller,
  ) {
    this.application = express();
    this.orm = orm;
    this.middlewares = middlewares;
    this.controllerManager = controllerManager;
  }
  public getServer = (): express.Application => {
    return this.application ? this.application : (this.application = express());
  };
  public listen = async () => {
    await this.orm.startTypeorm();
    const connection = getConnection(this.orm.getConnectionName());
    container.register(Connection, { useValue: connection });
    this.middlewares.initializeMiddlewares();
    this.application.listen(process.env.SERVER_PORT, () => {
      console.log(`⚡️ App listening on the port ${process.env.SERVER_PORT}`);
    });
  };
}

const app = new BootstrapApplication(
  await ormFactory.newOrmConnection(),
  middlewareFactory.newMiddleware(),
  controllerManagerFactory.newControllerManager(),
);

await app.listen();
