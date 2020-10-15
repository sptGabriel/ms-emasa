import { Employee, IEmployeeProps } from '../domain/employee';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { IEmployeeRepository } from './employee.repository';
import Knex from 'knex';
import { IMapper } from 'shared/core/infra/mapper';
import { Database } from '@infra/http/app/DataBase';
export class EmployeeRepository
  extends BaseRepository<Employee>
  implements IEmployeeRepository<Employee> {
  constructor(
    connection: Knex = container.resolve(Database).getConnection(),
    table: string = 'employees',
  ) {
    super(connection, table);
  }
  public findbyMatricula = async (
    matricula: string,
  ): Promise<Employee | undefined> => {
    const rawEmployee = await this.db
      .select<IEmployeeProps>([
        `${this.tableName}.*`,
        this.db.raw('to_json(departaments.*) as Departament'),
      ])
      .from(this.tableName)
      .where('matricula', matricula)
      .options({ nestTables: true })
      .innerJoin(
        'departaments',
        `${this.tableName}.departament_id`,
        'departaments.id',
      )
      .returning('*');
    if (!rawEmployee) return undefined;
    const employeeDomain = Employee.toDomain(rawEmployee[0]);
    return employeeDomain;
  };
  public find = async (id: string): Promise<Employee> => {
    const rawDepartament = await this.db
      .select('*')
      .from<IEmployeeProps>(this.tableName)
      .where('id', id)
      .returning('*');
    const departamentDomain = Employee.toDomain(rawDepartament[0]);
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
      const rawValue = Employee.toDomain(raw);
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
      const toDomainResult = Employee.toDomain(rawResult[0]);
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
      const rawToDomain = Employee.toDomain(rawResult[0]);
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
      const rawToDomain = Employee.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
}
