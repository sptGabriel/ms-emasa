import { NextFunction, Request, Response } from 'express';
import { BaseController } from 'shared/core/infra/base-controller';
import { container } from 'tsyringe';
import { Supplying, ISupplyingProps } from '../domain/supplying';
import {
  CreateProductSupplyingDTO,
  supplyingProducts,
} from '../useCases/createProductSupplying/createProductSupplying_DTO';
import { CreateProductSupplyingUseCase } from '../useCases/createProductSupplying';
import { ProvideProductsUseCase } from '../useCases/provideProducts';
export class ProvideProductsController extends BaseController {
  constructor() {
    super();
    this.path = '/supply';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/products`, this.provideProducts);
    this.router.post(`${this.path}/:supply_id`, this.provideProducts);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private createProductSupplying = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = request.body as CreateProductSupplyingDTO;
      const result = await container
        .resolve(CreateProductSupplyingUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
  private provideProducts = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { suppliedProducts } = request.body;
      const { supply_id } = request.params;
      const result = await container
        .resolve(ProvideProductsUseCase)
        .execute({ suppliedProducts, supply_id });
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
