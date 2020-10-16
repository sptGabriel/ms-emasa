import { AppError } from '@infra/http/app/BaseError';
import { Employee, IEmployeeProps } from '../../domain/employee';
import { IUseCase } from 'shared/core/domain/use-case';
import { Either, left, right } from 'shared/core/utils/result';
import { EmployeeRepository } from '../../infrastucture/employee.repositoryImpl';
import { createEmployeeDTO } from './createEmployee_DTO';
import { DepartamentRepository } from '@modules/departaments/infrastucture/departament.repositoryImpl';
import { container, injectable } from 'tsyringe';
@injectable()
export class CreateEmployeeUseCase
  implements IUseCase<createEmployeeDTO, Promise<Either<AppError, Employee>>> {
  constructor(
    private departamentRepository = container.resolve(DepartamentRepository),
    private employeeRepository = container.resolve(EmployeeRepository),
  ) {}
  public execute = async (
    request: createEmployeeDTO,
  ): Promise<Either<AppError, Employee>> => {
    const employeeExists = await this.employeeRepository.findbyMatricula(
      request.matricula,
    );
    if (employeeExists) return left(new Error('Employee Exists.'));
    const departamentExists = await this.departamentRepository.find(
      request.departament_id,
    );
    if (!departamentExists) return left(new Error('Departament not Exists.'));
    const domainEmployee = Employee.create({
      matricula: request.matricula,
      first_name: request.first_name,
      last_name: request.last_name,
      position: request.positions,
      departament: departamentExists,
    });
    if (domainEmployee.isLeft()) return left(domainEmployee.value);
    const employee = await this.employeeRepository.create(domainEmployee.value);
    return right(employee);
  };
}
