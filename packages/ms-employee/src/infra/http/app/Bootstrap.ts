import { ExpressServer, WebServer } from './WebServer';
import { container } from 'tsyringe';
import * as knexConfig from '@config/knexfile';
import { IDatabase } from './DataBase';

export interface BootStrapContainer {
  server: WebServer;
}

export class BootstrapApplication {
  private server: WebServer;
  private database: IDatabase;
  constructor(server: WebServer, database: IDatabase) {
    this.server = server;
    this.database = database;
  }
  public start = async () => {
    await this.server.start();
    await this.database.start();
  };
}
