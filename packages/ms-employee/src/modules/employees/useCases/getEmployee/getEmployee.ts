import { AppError } from '@infra/http/app/BaseError';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { EmployeeRepository } from '../../infrastucture/employee.repositoryImpl';
import { Employee } from '@modules/employees/domain/employee';
import { DepartamentRepository } from '@modules/departaments/infrastucture/departament.repositoryImpl';

export class GetEmployeeUseCase
  implements IUseCase<any, Promise<Either<AppError, Employee>>> {
  private departamentRepository: DepartamentRepository;
  private employeeRepository: EmployeeRepository;
  constructor(
    departamentRepository: DepartamentRepository,
    employeeRepository: EmployeeRepository,
  ) {
    this.departamentRepository = departamentRepository;
    this.employeeRepository = employeeRepository;
  }
  public execute = async (
    matricula: string,
  ): Promise<Either<AppError, Employee>> => {
    const employeeExists = await this.employeeRepository.findbyMatricula(
      matricula,
    );
    if (!employeeExists) return left(new Error('Method not implemented.'));
    return right(employeeExists);
  };
}
