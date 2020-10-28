import { AppError } from '@infra/http/app/BaseError';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { container } from 'tsyringe';
import { ProvideProductsDTOS, suppliedProducts } from './provideProductsDTOS';
import { SupplyingRepository } from '@modules/supplying/infrastucture/supplying.repositoryImpl';
import { Supplying } from '@modules/supplying/domain/supplying';
import { SupplierRepository } from '@modules/supplier/infrastucture/supplier.repositoryImpl';
import {
  ISuppliedProductsProps,
  SuppliedProducts,
} from '@modules/supplying/domain/supplying_products';

export class ProvideProductsUseCase
  implements
    IUseCase<ProvideProductsDTOS, Promise<Either<AppError, Supplying>>> {
  constructor(
    private supplyingRepository: SupplyingRepository = container.resolve(
      SupplyingRepository,
    ),
    private supplierRepository: SupplierRepository = container.resolve(
      SupplierRepository,
    ),
  ) {}
  private productsProvided = (
    suppliedProducts: suppliedProducts[],
    supply_id: string,
  ): SuppliedProducts[] => {
    return suppliedProducts.map(product => {
      return SuppliedProducts.toDomain({
        product_id: product.id,
        quantity: product.quantity,
        supply_id: supply_id,
      });
    });
  };
  public execute = async ({
    suppliedProducts,
    supply_id,
  }: ProvideProductsDTOS): Promise<Either<AppError, Supplying>> => {
    const hasSupply = await this.supplyingRepository.find(supply_id);
    if (!hasSupply) return left(new Error('Supply dont Exists.'));
    const suppliedProductsDomain = this.productsProvided(
      suppliedProducts,
      supply_id,
    );
    const supply = await this.supplyingRepository.provideProducts(
      suppliedProductsDomain,
      hasSupply,
    );
    return right(supply);
  };
}
