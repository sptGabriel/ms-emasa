import { ExpressServer, WebServer } from './WebServer';
import { RabbitMQ } from './RabbitMQ';
import { container, inject } from 'tsyringe';
import { KnexInstance } from '@infra/knex/knexConnection';

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
    await this.knex.runMigrations();
    await this.server.start();
  };
}
