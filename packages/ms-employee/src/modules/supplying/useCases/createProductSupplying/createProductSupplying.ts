import { AppError } from '@infra/http/app/BaseError';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, Left, left, right } from 'shared/core/utils/result';
import { container } from 'tsyringe';
import {
  CreateProductSupplyingDTO,
  supplyingProducts,
} from './createProductSupplying_DTO';
import { SupplyingRepository } from '@modules/supplying/infrastucture/supplying.repositoryImpl';
import { Supplying } from '@modules/supplying/domain/supplying';
import { SupplierRepository } from '@modules/supplier/infrastucture/supplier.repositoryImpl';
import { ProductRepository } from '@modules/products/infrastucture/product.repositoryImpl';
import { isProduct, Product } from '@modules/products/domain/product';
import { SuppliedProducts } from '@modules/supplying/domain/supplying_products';
import { findConfigFile } from 'typescript';

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
  // private productsProvided = (
  //   products: supplyingProducts[],
  //   supply_id: string,
  // ): SuppliedProducts[] => {
  //   return products.map(product => {
  //     return SuppliedProducts.toDomain({
  //       product_id: product.id,
  //       quantity: product.quantity,
  //       supply_id: supply_id,
  //     });
  //   });
  // };
  private checkProducts = async (
    ids: string[],
  ): Promise<Either<string[], Product[]>> => {
    const hasProducts = await this.productsRepository.findProductIDS(ids);
    const hasAll = ids.filter(
      id => !hasProducts.some(product => product.id === id),
    );
    if (hasAll.length === 0) return right(hasProducts);
    return left(new Error(`[${hasAll}] not founded`));
  };
  public execute = async ({
    arrived,
    products,
    supplier_id,
    orderedAt,
    arrivesAt,
  }: CreateProductSupplyingDTO): Promise<Either<AppError, Supplying>> => {
    const hasSupplier = await this.supplierRepository.find(supplier_id);
    if (!hasSupplier) return left(new Error('Supplier dont Exists.'));
    const hasProducts = await this.checkProducts(
      products.map(product => product.id),
    );
    if (hasProducts.isLeft()) return left(hasProducts.value);
    const domainSupply = Supplying.create({
      arrived,
      supplier_id,
      orderedAt,
      arrivesAt,
    });
    const suppliedProducts = products.map(product => {
      return SuppliedProducts.create({
        product_id: product.id,
        supply_id: domainSupply.id.toString(),
        quantity: product.quantity,
      }).toPersistence();
    });
    const supply = await this.supplyingRepository.createSupplying(
      domainSupply,
      suppliedProducts,
    );
    throw new Error('a');
  };
}
