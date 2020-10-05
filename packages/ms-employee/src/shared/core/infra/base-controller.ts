import express from 'express';
export abstract class BaseController {
  protected request: express.Request;
  protected response: express.Response;
  protected abstract executeImpl(): Promise<void | any>;
  public execute(request: express.Request, response: express.Response): void {
    this.request = request;
    this.response = response;
    this.executeImpl();
  }
}
