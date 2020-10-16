import { Model, ModelClass } from 'objection';
import Knex from 'knex';
import { IMapper } from '../infra/mapper';
export interface IRead {
  find(id: string): Promise<any | undefined>;
  findAll(): Promise<any[]>;
}
export interface IWrite {
  create(item: Object): Promise<any>;
  update(id: string, item: any): Promise<any>;
  delete(id: string): Promise<any>;
}
export abstract class BaseRepository implements IWrite, IRead {
  protected db: Knex;
  protected tableName: string;
  protected transactionProvider: () => Promise<Knex.Transaction<any, any>>;
  constructor(knex: Knex, table: string) {
    this.db = knex;
    this.tableName = table;
    this.transactionProvider = this.db.transactionProvider();
  }
  abstract find(id: string): Promise<any | undefined>;
  abstract findAll(): Promise<any[]>;
  abstract create(item: Object): Promise<any>;
  abstract update(id: string, item: any): Promise<any>;
  abstract delete(id: string): Promise<any>;
  public get Connection() {
    if (!this.db) throw new Error('Knex connection instance not implemented.');
    return this.db;
  }
}
