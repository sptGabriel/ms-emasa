import { Router } from 'express';
import { container } from 'tsyringe';
export type Class = { new (...args: any[]): any };
export const isClass = (object: any): object is Class => {
  return object;
};
export interface IController {
  getPath(): string;
  getRouter(): Router;
}
export class Controller {
  private controllers: IController[];
  constructor(controllers: IController[]) {
    this.controllers = controllers;
  }
  public registerControllersInContainer = () => {
    for (let controller of this.controllers) {
      if (isClass(controller))
        container.registerSingleton<IController>('Controllers', controller);
    }
  };
}
export class ControllerManagerFactory {
  private controllers: IController[];
  constructor() {}
  public setControllers(controllers: IController[]) {
    if (!controllers || isClass(controllers))
      throw new Error('Controllers must be provided');
    for (let controller of controllers) {
      this.controllers.push(controller);
    }
  }
  public newControllerManager = () => {
    if (!this.controllers) throw new Error('Controllers must be provided');
    return new Controller(this.controllers);
  };
}
