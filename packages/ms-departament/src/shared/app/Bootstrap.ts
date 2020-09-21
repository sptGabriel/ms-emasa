import express from 'express';
import { Typeorm, DataBase } from './DataBase';
import { ExpressServer, WebServer } from './WebServer';
import { RabbitMQ } from './RabbitMQ';
export class BootstrapApplication {
  private database: DataBase;
  private server: WebServer;
  private rabbitMqServer: RabbitMQ;
  constructor() {
    this.database = new Typeorm();
    this.server = new ExpressServer();
    this.rabbitMqServer = new RabbitMQ();
  }
  public start = async () => {
    await this.database.start();
    await this.rabbitMqServer.start();
    await this.server.start();
  };
}
