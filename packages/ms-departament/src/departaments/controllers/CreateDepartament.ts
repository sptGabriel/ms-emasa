import { NextFunction, Request, Response, Router } from 'express';
import { BaseController } from 'shared/contracts/BaseController';
import { singleton } from 'tsyringe';
import { AddDepartament } from '../dtos/Departament.dto';
@singleton()
export class CreateDepartament extends BaseController {
  constructor() {
    super('departament/add', Router());
  }
  public initializeRoutes(): void {}
  private createDepartament = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const data: AddDepartament = request.body;
  };
}
