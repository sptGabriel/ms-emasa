import { Departament, IDepartamentProps } from '../domain/departament';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { DepartamentMapper } from '../mappers/departament.mapper';
import { IDepartamentRepository } from './departament.repository';
import Knex from 'knex';
import { IMapper } from 'shared/core/infra/mapper';
import { Database } from '@infra/http/app/DataBase';
export class DepartamentRepository
  extends BaseRepository<Departament>
  implements IDepartamentRepository<Departament> {
  constructor(
    connection: Knex = container.resolve(Database).getConnection(),
    mapper: IMapper<Departament> = container.resolve(DepartamentMapper),
    table: string = 'departaments',
  ) {
    super(connection, mapper, table);
  }
  public find = async (id: string): Promise<Departament> => {
    const rawDepartament = await this.db
      .select('*')
      .from<IDepartamentProps>(this.tableName)
      .where('id', id)
      .returning('*');
    const departamentDomain = await this.Mapper.toDomain(rawDepartament);
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
      const rawValue = await this.Mapper.toDomain(raw);
      toDomainResults.push(rawValue);
    }
    return toDomainResults;
  };
  public create = async (item: any): Promise<Departament> => {
    // const promisify = (fn: any) => new Promise(resolve => fn(resolve));
    // const trx: Knex.Transaction = <Knex.Transaction>(
    //   await promisify(this.db.transaction)
    // );
    const trx = await this.transactionProvider();
    try {
      const rawExists = await this.findByName(item.departament_name);
      if (rawExists) Promise.reject(new Error('Data already exists'));
      const rawResult = await trx()
        .insert(item)
        .into<IDepartamentProps>(this.tableName)
        .returning('*');
      const toDomainResult = await this.Mapper.toDomain(rawResult);
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
        .returning('*');
      await trx.commit();
      const rawToDomain = await this.Mapper.toDomain(rawResult);
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
        .returning('*');
      const rawToDomain = await this.Mapper.toDomain(rawResult);
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
      .first();
    if (!rawDepartament) return undefined;
    const departamentDomain = await this.Mapper.toDomain(rawDepartament);
    return departamentDomain;
  };
}
