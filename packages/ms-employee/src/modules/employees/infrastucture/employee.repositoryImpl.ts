import { Employee, IEmployeeProps } from '../domain/employee';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { EmployeeMapper } from '../mappers/employee.mapper';
import { IEmployeeRepository } from './employee.repository';
import Knex from 'knex';
import { IMapper } from 'shared/core/infra/mapper';
import { Database } from '@infra/http/app/DataBase';
export class EmployeeRepository
  extends BaseRepository<Employee>
  implements IEmployeeRepository<Employee> {
  constructor(
    connection: Knex = container.resolve(Database).getConnection(),
    mapper: IMapper<Employee> = container.resolve(EmployeeMapper),
    table: string = 'employees',
  ) {
    super(connection, mapper, table);
  }
  public findbyMatricula = async (
    matricula: string,
  ): Promise<Employee | undefined> => {
    const rawEmployee = await this.db
      .select('*')
      .from<IEmployeeProps>(this.tableName)
      .where('matricula', matricula)
      .returning('*');
    const employeeDomain = await this.Mapper.toDomain(rawEmployee);
    return employeeDomain;
  };
  public find = async (id: string): Promise<Employee> => {
    const rawDepartament = await this.db
      .select('*')
      .from<IEmployeeProps>(this.tableName)
      .where('id', id)
      .returning('*');
    const departamentDomain = await this.Mapper.toDomain(rawDepartament);
    return departamentDomain;
  };
  public findAll = async (): Promise<Employee[]> => {
    const rawResults = await this.db
      .select('*')
      .from<IEmployeeProps>(this.tableName)
      .where('deleted_at', null)
      .returning('*');
    const toDomainResults = [];
    for (let raw of rawResults) {
      const rawValue = await this.Mapper.toDomain(raw);
      toDomainResults.push(rawValue);
    }
    return toDomainResults;
  };
  public create = async (item: any): Promise<Employee> => {
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx()
        .insert(item)
        .into(this.tableName)
        .returning('*');
      const toDomainResult = await this.Mapper.toDomain(rawResult);
      await trx.commit();
      return toDomainResult;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public update = async (id: string, item: any): Promise<Employee> => {
    const trx = await this.transactionProvider();
    try {
      const { departament_name, manager_id } = item;
      const rawResult = await trx()
        .update({
          departament_name,
          manager_id,
        })
        .where({ id })
        .returning('*');
      await trx.commit();
      const rawToDomain = await this.Mapper.toDomain(rawResult);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public delete = async (id: string): Promise<Employee> => {
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx()
        .where({ id })
        .update('deleted_at', new Date())
        .returning('*');
      const rawToDomain = await this.Mapper.toDomain(rawResult);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
}
