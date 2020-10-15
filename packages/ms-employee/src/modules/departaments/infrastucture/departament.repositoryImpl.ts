import { Departament, IDepartamentProps } from '../domain/departament';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { IDepartamentRepository } from './departament.repository';
import Knex from 'knex';
import { IMapper } from 'shared/core/infra/mapper';
import { Database } from '@infra/http/app/DataBase';
import { Employee } from '@modules/employees/domain/employee';
export class DepartamentRepository
  extends BaseRepository<Departament>
  implements IDepartamentRepository<Departament> {
  constructor(
    connection: Knex = container.resolve(Database).getConnection(),
    table: string = 'departaments',
  ) {
    super(connection, table);
  }
  public find = async (id: string): Promise<Departament> => {
    const rawDepartament = await this.db
      .select('*')
      .from<IDepartamentProps>(this.tableName)
      .where('id', id)
      .first()
      .returning('*');
    const departamentDomain = Departament.toDomain(rawDepartament[0]);
    return departamentDomain;
  };
  public findAll = async (): Promise<Departament[]> => {
    const rawResults = await this.db
      .select('*')
      .from<IDepartamentProps>(this.tableName)
      .where('deleted_at', null)
      .returning('*');
    const toDomainResults = [];
    for (let raw of rawResults) {
      const rawValue = Departament.toDomain(raw);
      toDomainResults.push(rawValue);
    }
    return toDomainResults;
  };
  public create = async (item: IDepartamentProps): Promise<Departament> => {
    // const promisify = (fn: any) => new Promise(resolve => fn(resolve));
    // const trx: Knex.Transaction = <Knex.Transaction>(
    //   await promisify(this.db.transaction)
    // );
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx(this.tableName)
        .insert({ id: item.id, departament_name: item.departament_name })
        .returning('*');
      const toDomainResult = Departament.toDomain(rawResult[0]);
      await trx.commit();
      return toDomainResult;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public update = async (id: string, item: any): Promise<Departament> => {
    const trx = await this.transactionProvider();
    try {
      const { departament_name, manager_id } = item;
      const rawResult = await trx()
        .update({
          departament_name,
          manager_id,
        })
        .where({ id })
        .first()
        .returning('*');
      await trx.commit();
      const rawToDomain = Departament.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public delete = async (id: string): Promise<Departament> => {
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx()
        .where({ id })
        .update('deleted_at', new Date())
        .first()
        .returning('*');
      const rawToDomain = Departament.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public findByName = async (
    departament_name: string,
  ): Promise<Departament | undefined> => {
    const rawDepartament = await this.db
      .select('*')
      .from<IDepartamentProps>(this.tableName)
      .where({ departament_name })
      .returning('*');
    if (rawDepartament.length === 0) return undefined;
    const departamentDomain = Departament.toDomain(rawDepartament[0]);
    return departamentDomain;
  };
}
