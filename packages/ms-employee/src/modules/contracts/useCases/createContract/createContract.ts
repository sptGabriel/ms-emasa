import { AppError } from '@infra/http/app/BaseError';
import { Contract, IContract } from '../../domain/contract';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { ContractRepository } from '../../infrastucture/contract.repositoryImpl';
import { container } from 'tsyringe';
import { ICreateContractDTO } from './createContract_DTO';

export class CreateContractUseCase
  implements IUseCase<ICreateContractDTO, Promise<Either<AppError, Contract>>> {
  constructor(
    private contractRepository: ContractRepository = container.resolve(
      ContractRepository,
    ),
  ) {}
  public execute = async (
    request: ICreateContractDTO,
  ): Promise<Either<AppError, Contract>> => {
    const contractAlreadyExist = await this.contractRepository.findBySignature(
      request.signature,
    );
    if (contractAlreadyExist) return left(new Error('Method not implemented.'));
    const domainContract = Contract.toDomain(request);
    const contract = await this.contractRepository.create(domainContract);
    return right(contract);
  };
}
