import { AppError } from '@infra/http/app/BaseError';
import { Departament, IDepartamentProps } from '../../domain/departament';
import { Manager, officesRoles } from '../../domain/manager';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { DepartamentRepository } from '../../infrastucture/departament.repository';
import { BaseRepository } from 'shared/core/utils/entityRepository';
const employeeData = {
  manager_id: 'c2d054ce-87af-4916-b58b-ce82b33a02b3',
  manager_name: 'adm',
  manager_officete: officesRoles.DIRETOR,
};
export class CreateDepartamentUseCase
  implements
    IUseCase<IDepartamentProps, Promise<Either<AppError, Departament>>> {
  private departamentRepository: DepartamentRepository;
  constructor(departamentRepository: DepartamentRepository) {
    this.departamentRepository = departamentRepository;
  }
  public execute = async (
    request: IDepartamentProps,
  ): Promise<Either<AppError, Departament>> => {
    const employee = employeeData;
    const departamentExists = await this.departamentRepository.findByName(
      request?.departament_name,
    );
    if (departamentExists) left(new Error('Method not implemented.'));

    const departament = await this.departamentRepository.create(request);
    return right(departament);
  };
}
