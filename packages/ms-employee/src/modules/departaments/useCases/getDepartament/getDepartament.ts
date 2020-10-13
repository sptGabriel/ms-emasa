import { AppError } from '@infra/http/app/BaseError';
import { Departament, IDepartamentProps } from '../../domain/departament';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { DepartamentRepository } from '../../infrastucture/departament.repositoryImpl';

export class getDepartamentUseCase
  implements IUseCase<any, Promise<Either<AppError, Departament>>> {
  private departamentRepository: DepartamentRepository;
  constructor(departamentRepository: DepartamentRepository) {
    this.departamentRepository = departamentRepository;
  }
  public execute = async (
    departament_name: string,
  ): Promise<Either<AppError, Departament>> => {
    const departamentExists = await this.departamentRepository.findByName(
      departament_name,
    );
    if (!departamentExists) return left(new Error('Method not implemented.'));
    return right(departamentExists);
  };
}
