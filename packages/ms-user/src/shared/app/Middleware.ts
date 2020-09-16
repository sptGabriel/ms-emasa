import express from 'express';
export class Middlewares {
  private middlewares: any[];
  private server: express.Application;
  constructor(server: express.Application, middlewares: any[]) {
    this.middlewares = middlewares;
    this.server = server;
  }
  getMiddlewares = () => {
    return this.middlewares;
  };
  getMiddleware = (middleware: any) => {
    return this.middlewares[middleware];
  };
  initializeMiddlewares = () => {
    if (this.middlewares.length <= 0)
      throw new Error('Middlewares must be provided');
    for (let middleware of this.middlewares) {
      this.server.use(middleware);
    }
  };
}
