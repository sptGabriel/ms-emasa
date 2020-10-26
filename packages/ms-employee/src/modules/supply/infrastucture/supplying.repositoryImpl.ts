import { Supplying, ISupplyingProps } from '../domain/supplying';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { ISupplyingRepository } from './supplying.repository';
import Knex from 'knex';
import { Database } from '@infra/http/app/DataBase';
export class SupplyingRepository
  extends BaseRepository<Supplying>
  implements ISupplyingRepository<Supplying> {
  constructor(
    connection: Knex = container.resolve(Database).getConnection(),
    table: string = 'supplying',
  ) {
    super(connection, table);
  }
  public find = async (id: string): Promise<Supplying | undefined> => {
    const rawDepartament = await this.db
      .select('*')
      .from<ISupplyingProps>(this.tableName)
      .where({ id })
      .first()
      .then(row => row);
    if (!rawDepartament) return undefined;
    const departamentDomain = Supplying.toDomain(rawDepartament);
    return departamentDomain;
  };
  public findAll = async (): Promise<Supplying[]> => {
    const rawResults = await this.db
      .select('*')
      .from<ISupplyingProps>(this.tableName)
      .where('deleted_at', null)
      .returning('*');
    const toDomainResults = [];
    for (let raw of rawResults) {
      const rawValue = Supplying.toDomain(raw);
      toDomainResults.push(rawValue);
    }
    return toDomainResults;
  };
  public create = async (item: Supplying): Promise<Supplying> => {
    // const promisify = (fn: any) => new Promise(resolve => fn(resolve));
    // const trx: Knex.Transaction = <Knex.Transaction>(
    //   await promisify(this.db.transaction)
    // );
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx(this.tableName).insert(item).returning('*');
      const toDomainResult = Supplying.toDomain(rawResult[0]);
      await trx.commit();
      return toDomainResult;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public update = async (id: string, item: any): Promise<Supplying> => {
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
      const rawToDomain = Supplying.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public delete = async (id: string): Promise<Supplying> => {
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx()
        .where({ id })
        .update('deleted_at', new Date())
        .first()
        .returning('*');
      const rawToDomain = Supplying.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
}
