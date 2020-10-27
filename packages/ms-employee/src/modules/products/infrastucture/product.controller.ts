import { NextFunction, Request, Response } from 'express';
import { BaseController } from 'shared/core/infra/base-controller';
import { container } from 'tsyringe';
import { Product, IProductProps } from '../domain/product';
import {
  ProductCategory,
  IProductCategoryProps,
} from '../domain/productCategory';
import {
  ProductInstance,
  IProductType,
  IProductInstanceProps,
} from '../domain/productInstance';
import { CreateProductCategoryUseCase } from '../useCases/createProductCategory';
import { createProductCategoryDTO } from '../useCases/createProductCategory/createProductCategory_DTO';
export class ProductController extends BaseController {
  constructor() {
    super();
    this.path = '/products';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/category/create`, this.createCategory);
    this.router.post(`${this.path}/create`, this.createCategory);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private createCategory = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: createProductCategoryDTO = request.body;
      const result = await container
        .resolve(CreateProductCategoryUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
