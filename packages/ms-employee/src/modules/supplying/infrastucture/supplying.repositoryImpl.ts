import { Supplying, ISupplyingProps } from '../domain/supplying';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { ISupplyingRepository } from './supplying.repository';
import Knex from 'knex';
import { Database } from '@infra/http/app/DataBase';
import {
  ISuppliedProductsProps,
  SuppliedProducts,
} from '../domain/supplying_products';
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
  public provideProducts = async (
    suppliedProducts: SuppliedProducts[],
    supply: Supplying,
  ) => {
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx<SuppliedProducts>('supplied_products')
        .insert(suppliedProducts)
        .returning('*')
        .then(row => {
          return Supplying.toDomain({ ...supply, supplied_products: row });
        });
      trx.commit();
      return rawResult;
    } catch (error) {
      console.log(error);
      trx.rollback();
      throw new Error('Error on database');
    }
  };
  public createSupplying = async (
    supply: Supplying,
    productsSupplied: SuppliedProducts[],
  ): Promise<Supplying> => {
    const trx = await this.transactionProvider();
    try {
      const rawResult = await trx
        .insert(supply.toPersistence())
        .into(this.tableName)
        .returning('*')
        .then(row => {
          const products = productsSupplied.map(productSupplied =>
            productSupplied.toPersistence(),
          );
          return trx.insert(products).into('supplied_productss').returning('*');
        });
      trx.commit();
      return rawResult;
    } catch (error) {
      console.log(error);
      trx.rollback();
      throw new Error('Error on database');
    }
  };
  // public createSupplyingWithProducts = async (
  //   item: Supplying,
  // ): Promise<Supplying> => {
  //   const trx = await this.transactionProvider();
  //   try {
  //     const rawResult = await trx<Supplying>(this.tableName)
  //       .insert({
  //         arrived: item.arrived,
  //         contract_id: item.contract_id,
  //         arrivesAt: item.arrivesAt,
  //         id: item.id,
  //         orderedAt: item.orderedAt,
  //         supplier_id: item.supplier_id,
  //       })
  //       .returning('*')
  //       .then(row => {
  //         let rowProducts: any[] = item.products.map(product => {
  //           return {
  //             supply_id: item.id,
  //             product_id: product.id,
  //             quantity: product.quantity,
  //           };
  //         });
  //         return trx('supplying_products')
  //           .insert(rowProducts)
  //           .returning('*')
  //           .then(item => {
  //             return Supplying.toDomain({
  //               id: row[0].id,
  //               contract_id: row[0].contract_id,
  //               arrived: row[0].arrived,
  //               supplier_id: row[0].supplier_id,
  //               products: rowProducts,
  //             });
  //           });
  //       });
  //     await trx.commit();
  //     return rawResult;
  //   } catch (error) {
  //     console.log(error);
  //     trx.rollback();
  //     throw new Error('Error on database');
  //   }
  // };
}
