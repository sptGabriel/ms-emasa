import express, { Router } from 'express';
export abstract class BaseController {
  protected router: Router;
  protected path: string;
  constructor() {
    this.router = Router();
  }
  protected abstract initRouter(): void | any;
  public getRouter() {
    return this.router;
  }
}
