import { NextFunction, Request, Response } from 'express';
import { BaseController } from 'shared/core/infra/base-controller';
import { container } from 'tsyringe';
import { Supplier, ISupplierProps } from '../domain/supplier';
import { CreateSupplierUseCase } from '../useCases/createSupplier';
export class SupplierController extends BaseController {
  constructor() {
    super();
    this.path = '/supplier';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/create`, this.createSupply);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private createSupply = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: ISupplierProps = request.body;
      const result = await container
        .resolve(CreateSupplierUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
