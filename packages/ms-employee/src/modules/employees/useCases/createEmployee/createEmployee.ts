import { AppError } from '@infra/http/app/BaseError';
import { Employee, IEmployeeProps } from '../../domain/employee';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { EmployeeRepository } from '../../infrastucture/employee.repositoryImpl';
import { createEmployeeDTO } from './createEmployee_DTO';
import { DepartamentRepository } from '@modules/departaments/infrastucture/departament.repositoryImpl';
export class CreateDepartamentUseCase
  implements IUseCase<createEmployeeDTO, Promise<Either<AppError, Employee>>> {
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
    request: createEmployeeDTO,
  ): Promise<Either<AppError, Employee>> => {
    const departamentExists = await this.departamentRepository.find(
      request.departament_id,
    );
    if (!departamentExists) return left(new Error('Departament not exists.'));
    const employeeExists = await this.employeeRepository.findbyMatricula(
      request.matricula,
    );
    if (employeeExists) return left(new Error('Employee already exists.'));
    const domainEmployee = await Employee.create({
      departament: departamentExists,
      first_name: request.first_name,
      last_name: request.last_name,
      matricula: request.matricula,
    });
    const employee = await this.employeeRepository
      .create(request)
      .catch(err => {
        return Promise.reject(err);
      });
    return right(employee);
  };
}
