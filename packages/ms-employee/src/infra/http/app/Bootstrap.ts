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
  constructor(server: WebServer, knex: KnexInstance) {
    this.server = server;
    this.knex = knex;
  }
  public start = async () => {
    await this.knex.start();
    await this.server.start();
  };
}
