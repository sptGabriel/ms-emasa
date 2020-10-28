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
      createProductCategoryDTO,
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
  public execute = async ({
    name,
    parent_id,
  }: createProductCategoryDTO): Promise<Either<AppError, ProductCategory>> => {
    const categoryExists = await this.productCategoryRepository.findByName(
      name,
    );
    if (categoryExists) return left(new Error('Category Already exists.'));
    const hasParent = parent_id
      ? await this.productCategoryRepository.find(parent_id)
      : null;
    if (hasParent === undefined) {
      return left(new Error('Category dont Exists.'));
    }
    const domainCategory = ProductCategory.toDomain({
      name,
      parent_id,
      parent: hasParent ? hasParent : undefined,
    });
    const category = await this.productCategoryRepository.create(
      domainCategory,
    );
    return right(category);
  };
}
