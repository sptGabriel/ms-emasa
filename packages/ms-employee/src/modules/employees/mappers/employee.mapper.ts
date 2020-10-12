import { IMapper } from '../../../shared/core/infra/mapper';
import { singleton } from 'tsyringe';
import { Employee, IEmployeeProps } from '../domain/employee';
import { DomainCreator } from 'shared/core/infra/createDomainFactory';
import { uuid, isUuid } from 'uuidv4';

@singleton()
export class EmployeeMapper implements IMapper<Employee> {
  constructor() {}
  public toPersistence = (t: any): Employee => {
    throw new Error('Method not implemented.');
  };
  public toDomain = async (raw: any): Promise<Employee> => {
    if (raw instanceof Employee) return raw;
    const data: IEmployeeProps = raw;
    if (!data) return Promise.reject('data is not valid');
    const employee = await Employee.create(data, data.id ? data.id : uuid());
    if (employee.isLeft()) return Promise.reject(employee.value);
    return employee.value;
  };
}
