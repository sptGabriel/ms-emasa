import {
  ProductCategory,
  IProductCategoryProps,
  isProductCategory,
} from '../domain/productCategory';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { IProductCategoryRepository } from './productCategory.repository';
import Knex from 'knex';
import { Database } from '@infra/http/app/DataBase';
export class ProductCategoryRepository
  extends BaseRepository<ProductCategory>
  implements IProductCategoryRepository<ProductCategory> {
  constructor(
    connection: Knex = container.resolve(Database).getConnection(),
    table: string = 'product_categories',
  ) {
    super(connection, table);
  }
  public findByName = async (
    name: string,
  ): Promise<ProductCategory | undefined> => {
    const rawDepartament = await this.db
      .select('*')
      .from<ProductCategory>(this.tableName)
      .where({ name })
      .first()
      .then(row => row);
    if (!rawDepartament) return undefined;
    const categoryDomain = ProductCategory.toDomain(rawDepartament);
    return categoryDomain;
  };
  public find = async (id: string): Promise<ProductCategory | undefined> => {
    const rawDepartament = await this.db
      .select('*')
      .from<ProductCategory>(this.tableName)
      .where({ id })
      .first()
      .then(row => row);
    if (!rawDepartament) return undefined;
    const categoryDomain = ProductCategory.toDomain(rawDepartament);
    return categoryDomain;
  };
  public findAll = async (): Promise<ProductCategory[]> => {
    const rawResults = await this.db
      .select('*')
      .from<ProductCategory>(this.tableName)
      .where('deleted_at', null)
      .returning('*');
    const toDomainResults = [];
    for (let raw of rawResults) {
      const rawValue = ProductCategory.toDomain(raw);
      toDomainResults.push(rawValue);
    }
    return toDomainResults;
  };
  public create = async (item: ProductCategory): Promise<ProductCategory> => {
    const trx = await this.transactionProvider();
    try {
      if (!isProductCategory(item)) throw new Error('Invalid data type.');
      const rawResult = await trx<ProductCategory>(this.tableName)
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
  public update = async (
    id: string,
    item: ProductCategory,
  ): Promise<ProductCategory> => {
    const trx = await this.transactionProvider();
    try {
      // const { departament_name, manager_id } = item;
      const rawResult = await trx().update(item).where({ id }).returning('*');
      await trx.commit();
      const rawToDomain = ProductCategory.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
  public delete = async (id: string): Promise<ProductCategory> => {
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx()
        .where({ id })
        .update('deleted_at', new Date())
        .returning('*');
      const rawToDomain = ProductCategory.toDomain(rawResult[0]);
      return rawToDomain;
    } catch (error) {
      trx.rollback();
      return Promise.reject('Error adding departament Name: ' + error);
    }
  };
}
