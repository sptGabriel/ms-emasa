import { Contract, IContract } from '../domain/contract';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { IContractRepository } from './contract.repository';
import Knex from 'knex';
import { Database } from '@infra/http/app/DataBase';
export class ContractRepository
  extends BaseRepository<Contract>
  implements IContractRepository<Contract> {
  constructor(
    connection: Knex = container.resolve(Database).getConnection(),
    table: string = 'contracts',
  ) {
    super(connection, table);
  }
  public findBySignature = async (
    signature: string,
  ): Promise<Contract | undefined> => {
    const rawSignature = await this.db
      .select('*')
      .from<Contract>(this.tableName)
      .where({ signature })
      .first()
      .then(row => row);
    if (!rawSignature) return undefined;
    const signatureDomain = Contract.toDomain(rawSignature);
    return signatureDomain;
  };
  public find = async (id: string): Promise<Contract | undefined> => {
    const rawContract = await this.db
      .select('*')
      .from<Contract>(this.tableName)
      .where({ id })
      .first()
      .then(row => row);
    if (!rawContract) return undefined;
    const contractDomain = Contract.toDomain(rawContract);
    return contractDomain;
  };
  public findAll = async (): Promise<Contract[]> => {
    const rawResults = await this.db
      .select('*')
      .from<Contract>(this.tableName)
      .where('deleted_at', null)
      .returning('*');
    const toDomainResults = [];
    for (let raw of rawResults) {
      const rawValue = Contract.toDomain(raw);
      toDomainResults.push(rawValue);
    }
    return toDomainResults;
  };
  public create = async (item: Contract): Promise<Contract> => {
    // const promisify = (fn: any) => new Promise(resolve => fn(resolve));
    // const trx: Knex.Transaction = <Knex.Transaction>(
    //   await promisify(this.db.transaction)
    // );
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx<Contract>(this.tableName)
        .insert(item)
        .returning('*');
      const toDomainResult = Contract.toDomain(rawResult[0]);
      await trx.commit();
      return toDomainResult;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public update = async (id: string, item: any): Promise<Contract> => {
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
      const rawToDomain = Contract.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public delete = async (id: string): Promise<Contract> => {
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx()
        .where({ id })
        .update('deleted_at', new Date())
        .first()
        .returning('*');
      const rawToDomain = Contract.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
}
