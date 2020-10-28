import { Employee } from '../domain/employee';

export interface IEmployeeRepository<employee = Employee> {
  findbyMatricula(name: string): Promise<employee | undefined>;
}
