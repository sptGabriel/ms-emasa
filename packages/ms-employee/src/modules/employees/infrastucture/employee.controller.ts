import { NextFunction, Request, Response } from 'express';
import { BaseController } from 'shared/core/infra/base-controller';
import { container } from 'tsyringe';
import {
  IEmployeeProps,
  EnumEmployeePostions,
  Employee,
} from '../domain/employee';
import { CreateEmployeeUseCase } from '../useCases/createEmployee';
import { createEmployeeDTO } from '../useCases/createEmployee/createEmployee_DTO';
export class EmployeeController extends BaseController {
  constructor() {
    super();
    this.path = '/employee';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/create`, this.createEmployee);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private createEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: createEmployeeDTO = request.body;
      const result = await container
        .resolve(CreateEmployeeUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
