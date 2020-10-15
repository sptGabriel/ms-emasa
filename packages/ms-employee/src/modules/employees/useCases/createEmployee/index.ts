import { DepartamentRepository } from '@modules/departaments/infrastucture/departament.repositoryImpl';
import { EmployeeRepository } from '@modules/employees/infrastucture/employee.repositoryImpl';
import { CreateEmployeeUseCase } from './createEmployee';
import { CreateEmployeeController } from './createEmployeeController';

const departamentRepository = new DepartamentRepository();
const employeeRepository = new EmployeeRepository();
const createEmployeeUseCase = new CreateEmployeeUseCase(
  departamentRepository,
  employeeRepository,
);
const createEmployeeController = new CreateEmployeeController(
  createEmployeeUseCase,
);
export { createEmployeeController, createEmployeeUseCase };
