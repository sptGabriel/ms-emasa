import { Model, ModelClass } from 'objection';
import Knex from 'knex';
import { IMapper } from '../infra/mapper';
export interface IRead<T> {
  find(id: string): Promise<T | undefined>;
  findAll(): Promise<any[]>;
}
export interface IWrite<T> {
  create(item: T): Promise<T | any>;
  update(id: string, item: T): Promise<T | any>;
  delete(id: string): Promise<T | any>;
}
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  protected db: Knex;
  protected tableName: string;
  protected transactionProvider: () => Promise<Knex.Transaction<any, any>>;
  constructor(knex: Knex, table: string) {
    this.db = knex;
    this.tableName = table;
    this.transactionProvider = this.db.transactionProvider();
  }
  abstract find(id: string): Promise<T | undefined>;
  abstract findAll(): Promise<any[]>;
  abstract create(item: T): Promise<any>;
  abstract update(id: string, item: T): Promise<any>;
  abstract delete(id: string): Promise<any>;
  public get Connection() {
    if (!this.db) throw new Error('Knex connection instance not implemented.');
    return this.db;
  }
}
