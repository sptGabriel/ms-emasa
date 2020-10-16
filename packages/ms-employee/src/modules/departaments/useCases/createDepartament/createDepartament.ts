import { AppError } from '@infra/http/app/BaseError';
import { Departament, IDepartamentProps } from '../../domain/departament';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { DepartamentRepository } from '../../infrastucture/departament.repositoryImpl';
import { container } from 'tsyringe';

export class CreateDepartamentUseCase
  implements
    IUseCase<IDepartamentProps, Promise<Either<AppError, Departament>>> {
  private departamentRepository: DepartamentRepository;
  constructor(
    departamentRepository: DepartamentRepository = container.resolve(
      DepartamentRepository,
    ),
  ) {
    this.departamentRepository = departamentRepository;
  }
  public execute = async (
    request: IDepartamentProps,
  ): Promise<Either<AppError, Departament>> => {
    const departamentExists = await this.departamentRepository.findByName(
      request.departament_name,
    );
    if (departamentExists) return left(new Error('Method not implemented.'));
    const domainDepartament = Departament.toDomain(request);
    const departament = await this.departamentRepository.create(
      domainDepartament,
    );
    return right(departament);
  };
}
