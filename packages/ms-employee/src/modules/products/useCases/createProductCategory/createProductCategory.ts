import { AppError } from '@infra/http/app/BaseError';
import {
  ProductCategory,
  IProductCategoryProps,
} from '../../domain/productCategory';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { ProductRepository } from '../../infrastucture/product.repositoryImpl';
import { container } from 'tsyringe';
import { ProductCategoryRepository } from '@modules/products/infrastucture/productCategory.repositoryImpl';
import { createProductCategoryDTO } from './createProductCategory_DTO';

export class CreateProductCategoryUseCase
  implements
    IUseCase<
      IProductCategoryProps,
      Promise<Either<AppError, ProductCategory>>
    > {
  private productCategoryRepository: ProductCategoryRepository;
  constructor(
    productCategoryRepository: ProductCategoryRepository = container.resolve(
      ProductCategoryRepository,
    ),
  ) {
    this.productCategoryRepository = productCategoryRepository;
  }
  public execute = async (
    request: createProductCategoryDTO,
  ): Promise<Either<AppError, ProductCategory>> => {
    var parent = {} as ProductCategory;
    const categoryExists = await this.productCategoryRepository.findByName(
      request.name,
    );

    if (categoryExists) return left(new Error('Category Already exists.'));
    const domainCategory = ProductCategory.toDomain();
    const Category = await this.productCategoryRepository.create(
      domainCategory,
    );
    return right(Category);
  };
}
