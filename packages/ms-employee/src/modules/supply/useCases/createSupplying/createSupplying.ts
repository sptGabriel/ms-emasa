import { AppError } from '@infra/http/app/BaseError';
import { Supplier, ISupplierProps } from '../../domain/supplier';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { SupplierRepository } from '../../infrastucture/supplier.repositoryImpl';
import { container } from 'tsyringe';
import { CreateSupplyingDTO } from './createSupplyingDTO';
import { ContractRepository } from '@modules/contracts/infrastucture/contract.repositoryImpl';
import { SupplyingRepository } from '@modules/supply/infrastucture/supplying.repositoryImpl';
import { products, Supplying } from '@modules/supply/domain/supplying';

export class CreateSupplyingUseCase
  implements
    IUseCase<CreateSupplyingDTO, Promise<Either<AppError, Supplying>>> {
  constructor(
    private supplyingRepository: SupplyingRepository = container.resolve(
      SupplyingRepository,
    ),
    private supplierRepository: SupplierRepository = container.resolve(
      SupplierRepository,
    ),
    private contractRepository: ContractRepository = container.resolve(
      ContractRepository,
    ),
  ) {}
  public execute = async (
    request: CreateSupplyingDTO,
  ): Promise<Either<AppError, Supplying>> => {
    const hasContract = await this.contractRepository.find(request.contract_id);
    if (!hasContract) return left(new Error('Conract dont Exists.'));
    const hasSupplier = await this.supplierRepository.find(request.supplier_id);
    if (!hasSupplier) return left(new Error('Supplier dont Exists.'));
    const domainSupplier = Supplying.toDomain(request);
    const supplier = await this.supplyingRepository.createSupplyingWithProducts(
      domainSupplier,
    );
    return right(supplier);
  };
}
