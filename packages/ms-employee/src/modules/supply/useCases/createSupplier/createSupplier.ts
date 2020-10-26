import { AppError } from '@infra/http/app/BaseError';
import { Supplier, ISupplierProps } from '../../domain/supplier';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { SupplierRepository } from '../../infrastucture/supplier.repositoryImpl';
import { container } from 'tsyringe';

export class CreateSupplierUseCase
  implements IUseCase<ISupplierProps, Promise<Either<AppError, Supplier>>> {
  private supplierRepository: SupplierRepository;
  constructor(
    supplierRepository: SupplierRepository = container.resolve(
      SupplierRepository,
    ),
  ) {
    this.supplierRepository = supplierRepository;
  }
  public execute = async (
    request: ISupplierProps,
  ): Promise<Either<AppError, Supplier>> => {
    const supplierExists = await this.supplierRepository.findbyCNPJ(
      request.cnpj,
    );
    if (supplierExists) return left(new Error('Supplier Already Exists.'));
    const domainSupplier = Supplier.toDomain(request);
    const supplier = await this.supplierRepository.create(domainSupplier);
    return right(supplier);
  };
}
