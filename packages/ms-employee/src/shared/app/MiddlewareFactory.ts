import { Middlewares } from './Middleware';

export class MiddlewareFactory {
  private middlewares: any[];
  private server: Express.Application;
  constructor() {}
  public setServer(server: Express.Application) {
    if (this.server) throw new Error('Server has been provided');
    this.server = server;
  }
  public registryMiddleware = (middleware: any | any[]) => {
    if (!(typeof middleware === 'function'))
      throw new Error('Middlewares function must be provided');
    this.middlewares.push(middleware);
  };
  public registryMiddlewares = <T>(middlewares: any[]) => {
    for (let middleware of middlewares) {
      if (!(typeof middleware === 'function'))
        throw new Error('Middlewares function must be provided');
      this.middlewares.push(middleware);
    }
  };
  public newMiddleware = () => {
    if (!(this.middlewares.length > 0) || this.server)
      throw new Error('Middlewares or server must be provided');
    return new Middlewares(this.server, this.middlewares);
  };
}
