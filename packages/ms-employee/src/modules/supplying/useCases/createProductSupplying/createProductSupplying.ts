import { AppError } from '@infra/http/app/BaseError';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { container } from 'tsyringe';
import {
  CreateProductSupplyingDTO,
  supplyingProducts,
} from './createProductSupplying_DTO';
import { SupplyingRepository } from '@modules/supplying/infrastucture/supplying.repositoryImpl';
import { Supplying } from '@modules/supplying/domain/supplying';
import { SupplierRepository } from '@modules/supplier/infrastucture/supplier.repositoryImpl';
import { ProductRepository } from '@modules/products/infrastucture/product.repositoryImpl';

export class CreateProductSupplyingUseCase
  implements
    IUseCase<CreateProductSupplyingDTO, Promise<Either<AppError, Supplying>>> {
  constructor(
    private supplyingRepository: SupplyingRepository = container.resolve(
      SupplyingRepository,
    ),
    private supplierRepository: SupplierRepository = container.resolve(
      SupplierRepository,
    ),
    private productsRepository: ProductRepository = container.resolve(
      ProductRepository,
    ),
  ) {}
  // private productsProvided = (
  //   suppliedProducts: suppliedProducts[],
  //   supply_id: string,
  // ): SuppliedProducts[] => {
  //   return suppliedProducts.map(product => {
  //     return SuppliedProducts.toDomain({
  //       product_id: product.id,
  //       quantity: product.quantity,
  //       supply_id: supply_id,
  //     });
  //   });
  // };
  public execute = async ({
    arrived,
    suppliedProducts,
    supplier_id,
  }: CreateProductSupplyingDTO): Promise<Either<AppError, Supplying>> => {
    const hasSupplier = await this.supplierRepository.find(supplier_id);
    if (!hasSupplier) return left(new Error('Supplier dont Exists.'));
    const products_ids = suppliedProducts.map(product => product.id);
    const hasProducts = await this.productsRepository.findProductIDS(
      products_ids,
    );
    if (!hasProducts) return left(new Error('Products dont Exists.'));
    const supplyDomain = Supplying.toDomain({
      arrived,
      supplied_products,
      supplier_id,
    });
    return right(supply);
  };
}
