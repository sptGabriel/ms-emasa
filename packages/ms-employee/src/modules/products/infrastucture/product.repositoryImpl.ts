import { Product, IProductProps, isProduct } from '../domain/product';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { IProductRepository } from './product.repository';
import Knex from 'knex';
import { Database } from '@infra/http/app/DataBase';

export class ProductRepository
  extends BaseRepository<Product>
  implements IProductRepository<Product> {
  constructor(
    connection: Knex = container.resolve(Database).getConnection(),
    table: string = 'products',
  ) {
    super(connection, table);
  }
  public findCodReference = async (
    codReference: string,
  ): Promise<Product | undefined> => {
    const rawProduct = await this.db
      .select('*')
      .from<Product>(this.tableName)
      .where({ codReference })
      .first()
      .then(row => row);
    if (!rawProduct) return undefined;
    const productDomain = Product.toDomain(rawProduct);
    return productDomain;
  };
  public find = async (id: string): Promise<Product | undefined> => {
    const rawDepartament = await this.db
      .select('*')
      .from<Product>(this.tableName)
      .where({ id })
      .first()
      .then(row => row);
    if (!rawDepartament) return undefined;
    const departamentDomain = Product.toDomain(rawDepartament);
    return departamentDomain;
  };
  public findAll = async (): Promise<Product[]> => {
    const rawResults = await this.db
      .select('*')
      .from<Product>(this.tableName)
      .where('deleted_at', null)
      .returning('*');
    const toDomainResults = [];
    for (let raw of rawResults) {
      const rawValue = Product.toDomain(raw);
      toDomainResults.push(rawValue);
    }
    return toDomainResults;
  };
  public create = async (item: Product): Promise<Product> => {
    const trx = await this.transactionProvider();
    try {
      const dataToInsert: Omit<Product, 'category'> = item;
      if (!isProduct(item)) throw new Error('Invalid data type.');
      const rawResult = await trx<Product>(this.tableName)
        .insert(dataToInsert)
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
  public update = async (id: string, item: Product): Promise<Product> => {
    const trx = await this.transactionProvider();
    try {
      // const { departament_name, manager_id } = item;
      const rawResult = await trx().update(item).where({ id }).returning('*');
      await trx.commit();
      const rawToDomain = Product.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public delete = async (id: string): Promise<Product> => {
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx()
        .where({ id })
        .update('deleted_at', new Date())
        .returning('*');
      const rawToDomain = Product.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
}
