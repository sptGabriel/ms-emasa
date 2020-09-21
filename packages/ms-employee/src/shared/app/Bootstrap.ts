import { ExpressServer, WebServer } from './WebServer';
import { RabbitMQ } from './RabbitMQ';
import options from '../../Mikro-orm.config';

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
    await this.start();
    await this.rabbitMqServer.start();
  };
}
