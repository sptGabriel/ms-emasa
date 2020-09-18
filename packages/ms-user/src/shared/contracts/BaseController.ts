import { Router } from 'express';
export abstract class BaseController {
  private path: string;
  private router: Router;
  constructor(path: string, router: Router) {
    this.path = path;
    this.router = router;
  }
  abstract initializeRoutes(): void;
  public getPath(): string {
    if (!this.path) throw new Error('Need pass path instanceof string');
    return this.path;
  }
  public getRouter(): Router {
    if (!this.router) throw new Error('Need inject router dependency');
    return this.router;
  }
}
