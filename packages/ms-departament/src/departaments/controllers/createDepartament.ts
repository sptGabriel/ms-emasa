import { NextFunction, Request, Response, Router } from 'express';
import { BaseController } from 'shared/contracts/BaseController';
import { } from '../dtos/departament.dto'
export class CreateDepartament extends BaseController {
  constructor(path: string, router: Router) {
    super(path, router);
  }
  public initializeRoutes(): void {}
  private createDepartament = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const data:  = request.body;
  };
}
