import { Employee } from '../domain/employee';
import { BaseRepository } from 'shared/core/utils/entityRepository';

export interface IEmployeeRepository<employee = Employee> {
  findbyMatricula(name: string): Promise<employee | undefined>;
}
