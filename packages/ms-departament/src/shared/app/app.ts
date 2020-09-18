import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import { BaseController } from 'shared/contracts/BaseController';
import { container } from 'tsyringe';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { Connection, createConnection } from 'typeorm';
import typeormConfig from './TypeOrm/ormconfig';
export class BoostrapApplication {
  controllers: BaseController[];
  server: express.Application;
  constructor(controllers: BaseController[]) {
    this.server = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
  public getServer() {
    return this.server;
  }
  public listen = async () => {
    try {
      const connection = await createConnection(typeormConfig);
      await connection.runMigrations();
      container.register(Connection, { useValue: connection });
      this.server.listen(3000, () => {
        console.log(`⚡️ App listening on the port 3000`);
      });
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
  };
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
  private initializeControllers = (controllers: BaseController[]) => {
    controllers.forEach(controller => {
      if (!controller.getRouter()) return;
      this.server.use('/', controller.getRouter());
    });
  };
}
