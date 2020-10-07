import { ExpressServer, WebServer } from './WebServer';
import { container } from 'tsyringe';
import { KnexInstance } from '@infra/knex/knexConnection';
import * as knexConfig from '@config/knexfile';

export interface BootStrapContainer {
  server: WebServer;
}

export class BootstrapApplication {
  private server: WebServer;
  private knex: KnexInstance;
  constructor() {
    this.server = new ExpressServer();
    this.knex = container.resolve(KnexInstance);
  }
  public start = async () => {
    await this.knex.start(knexConfig);
    await this.server.start();
  };
}
