import { NextFunction, Request, Response, Router } from 'express';
import { BaseController } from 'shared/contracts/BaseController';
import { AddEmployee } from '../dtos/Employee.dto';
export class CreateEmployee extends BaseController {
  constructor(path: string, router: Router) {
    super(path, router);
  }
  public initializeRoutes(): void {}
  private createEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const data: AddEmployee = request.body;
  };
}
