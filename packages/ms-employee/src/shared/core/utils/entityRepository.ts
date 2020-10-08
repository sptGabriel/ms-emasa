import { Model, ModelClass } from 'objection';
import Knex from 'knex';
import { IMapper } from '../infra/mapper';
export interface IRead<T> {
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
export interface IWrite<T> {
  create(item: Object): Promise<T>;
  update(id: string, item: any): Promise<T>;
  delete(id: string): Promise<T>;
}
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  protected db: Knex;
  protected tableName: string;
  protected mapper: IMapper<T>;
  protected transactionProvider: () => Promise<Knex.Transaction<any, any>>;
  constructor(knex: Knex, mapper: IMapper<T>, table: string) {
    this.db = knex;
    this.mapper = mapper;
    this.tableName = table;
    this.transactionProvider = this.db.transactionProvider();
  }
  abstract find(id: string): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract create(item: Object): Promise<T>;
  abstract update(id: string, item: T): Promise<T>;
  abstract delete(id: string): Promise<T>;
  public get Mapper() {
    if (!this.mapper) throw new Error('Mapper not implemented.');
    return this.mapper;
  }
  public get Connection() {
    if (!this.db) throw new Error('Knex connection instance not implemented.');
    return this.db;
  }
}
