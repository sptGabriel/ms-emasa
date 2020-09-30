import { ExpressServer, WebServer } from './WebServer';
import { RabbitMQ } from './RabbitMQ';
import { MikroClient, ORM } from './OrmClient';
import { container, inject } from 'tsyringe';

export interface BootStrapContainer {
  server: WebServer;
  rabbitMqServer: RabbitMQ;
}

export class BootstrapApplication {
  private server: WebServer;
  private rabbitMqServer: RabbitMQ;
  constructor() {
    this.server = new ExpressServer();
    this.rabbitMqServer = new RabbitMQ();
  }
  public start = async () => {
    await this.rabbitMqServer.start();
    await this.server.start();
  };
}
