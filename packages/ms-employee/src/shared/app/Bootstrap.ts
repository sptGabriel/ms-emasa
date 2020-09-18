import express from 'express';
import { Typeorm, DataBase } from './DataBase';
import { ExpressServer, WebServer } from './WebServer';
export class BootstrapApplication {
  private database: DataBase;
  private server: WebServer;
  constructor() {
    this.database = new Typeorm();
    this.server = new ExpressServer();
  }
  public start = () => {
    this.database.start();
    this.server.start();
  };
}
