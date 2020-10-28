import { AppError } from '@infra/http/app/BaseError';
import { Product, IProductProps } from '../../domain/product';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { ProductRepository } from '../../infrastucture/product.repositoryImpl';
import { container } from 'tsyringe';
import { ProductCategoryRepository } from '@modules/products/infrastucture/productCategory.repositoryImpl';
import { CreateProductDTO } from './createProduct_DTO';

export class CreateProductUseCase
  implements IUseCase<IProductProps, Promise<Either<AppError, Product>>> {
  private productRepository: ProductRepository;
  private categoryRepository: ProductCategoryRepository;
  constructor(
    productRepository: ProductRepository = container.resolve(ProductRepository),
    categoryRepository: ProductCategoryRepository = container.resolve(
      ProductCategoryRepository,
    ),
  ) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  }
  public execute = async (
    request: CreateProductDTO,
  ): Promise<Either<AppError, Product>> => {
    const productAlreadyExists = await this.productRepository.findCodReference(
      request.codReference,
    );
    if (productAlreadyExists) return left(new Error('Product Already exists.'));
    const categoryExists = await this.categoryRepository.find(
      request.category_id,
    );
    if (!categoryExists) return left(new Error('Category Dont Exist.'));
    const domainProduct = Product.toDomain(request);
    const product = await this.productRepository.create(domainProduct);
    return right(product);
  };
}
