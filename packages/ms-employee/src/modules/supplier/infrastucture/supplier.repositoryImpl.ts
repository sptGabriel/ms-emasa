import { Supplier, ISupplierProps, isSupplier } from '../domain/supplier';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { ISupplierRepository } from './supplier.repository';
import Knex from 'knex';
import { IMapper } from 'shared/core/infra/mapper';
import { Database } from '@infra/http/app/DataBase';
import { raw } from 'body-parser';
export class SupplierRepository
  extends BaseRepository<Supplier>
  implements ISupplierRepository<Supplier> {
  constructor(
    connection: Knex = container.resolve(Database).getConnection(),
    table: string = 'suppliers',
  ) {
    super(connection, table);
  }
  public findbyCNPJ = async (cnpj: string): Promise<Supplier | undefined> => {
    const rawSupplier = await this.db
      .select('*')
      .from<Supplier>(this.tableName)
      .where({ cnpj })
      .first()
      .then(row => row);
    if (!rawSupplier) return undefined;
    const departamentDomain = Supplier.toDomain(rawSupplier);
    return departamentDomain;
  };
  public find = async (id: string): Promise<Supplier | undefined> => {
    const rawDepartament = await this.db
      .select('*')
      .from<ISupplierProps>(this.tableName)
      .where({ id })
      .first()
      .then(row => row);
    if (!rawDepartament) return undefined;
    const supplierDomain = Supplier.toDomain(rawDepartament);
    return supplierDomain;
  };
  public findAll = async (): Promise<Supplier[]> => {
    const rawResults = await this.db
      .select('*')
      .from<ISupplierProps>(this.tableName)
      .where('deleted_at', null)
      .returning('*');
    const toDomainResults = [];
    for (let raw of rawResults) {
      const rawValue = Supplier.toDomain(raw);
      toDomainResults.push(rawValue);
    }
    return toDomainResults;
  };
  public create = async (item: Supplier): Promise<Supplier> => {
    const trx = await this.transactionProvider();
    try {
      if (!isSupplier(item)) throw new Error('Invalid data type.');
      const rawResult = await trx<Supplier>(this.tableName)
        .insert(item)
        .returning('*')
        .then(row => row[0]);
      await trx.commit();
      return rawResult;
    } catch (error) {
      console.log(error);
      trx.rollback();
      throw new Error('Error on database');
    }
  };
  public update = async (id: string, item: Supplier): Promise<Supplier> => {
    const trx = await this.transactionProvider();
    try {
      // const { departament_name, manager_id } = item;
      const rawResult = await trx().update(item).where({ id }).returning('*');
      await trx.commit();
      const rawToDomain = Supplier.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public delete = async (id: string): Promise<Supplier> => {
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx()
        .where({ id })
        .update('deleted_at', new Date())
        .returning('*');
      const rawToDomain = Supplier.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
}
