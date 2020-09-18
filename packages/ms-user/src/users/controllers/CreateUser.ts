import { NextFunction, Request, Response, Router } from 'express';
import { BaseController } from 'shared/contracts/BaseController';
import { UserDTO } from '../dtos/User.dto';
export class CreateUser extends BaseController {
  constructor(path: string, router: Router) {
    super(path, router);
  }
  public initializeRoutes(): void {}
  private createUser = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const data: UserDTO = request.body;
  };
}
