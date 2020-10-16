import { NextFunction, Request, Response } from 'express';
import { BaseController } from 'shared/core/infra/base-controller';
import { container } from 'tsyringe';
import { IDepartamentProps } from '../domain/departament';
import { CreateDepartamentUseCase } from '../useCases/createDepartament';
export class DepartamentController extends BaseController {
  constructor() {
    super();
    this.path = '/departament';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/create`, this.createDepartament);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private createDepartament = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: IDepartamentProps = request.body;
      const result = await container
        .resolve(CreateDepartamentUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
