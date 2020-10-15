import { DepartamentRepository } from '@modules/departaments/infrastucture/departament.repositoryImpl';
import { EmployeeRepository } from '@modules/employees/infrastucture/employee.repositoryImpl';
import { GetEmployeeUseCase } from './getEmployee';
import { GetEmployeeController } from './getEmployeeController';

const departamentRepository = new DepartamentRepository();
const employeeRepository = new EmployeeRepository();
const getEmployeeUseCase = new GetEmployeeUseCase(
  departamentRepository,
  employeeRepository,
);
const getEmployeeController = new GetEmployeeController(getEmployeeUseCase);
export { getEmployeeController, getEmployeeUseCase };
