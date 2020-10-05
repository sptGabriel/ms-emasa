import { Model, ModelClass } from 'objection';
import Knex from 'knex';
import { IMapper } from '../infra/mapper';
export interface IRead<T> {
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
export interface IWrite<T> {
  create(item: Object): Promise<T>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<T>;
}
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  private knex: Knex;
  private mapper: IMapper<T>;
  private query: Knex.QueryBuilder;
  constructor(knex: Knex, mapper: IMapper<T>, tableName: string) {
    this.knex = knex;
    this.mapper = mapper;
    this.query = this.knex(tableName);
  }
  abstract find(id: string): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract create(item: Object): Promise<T>;
  abstract update(id: string, item: T): Promise<T>;
  abstract delete(id: string): Promise<T>;
  public get Query() {
    if (!this.query) throw new Error('Tabble not implemented.');
    const a = this.knex('aa');
    return this.query;
  }
  public get Mapper() {
    if (!this.mapper) throw new Error('Mapper not implemented.');
    return this.mapper;
  }
  public get Knex() {
    if (!this.knex)
      throw new Error('Knex connection instance not implemented.');
    return this.knex;
  }
}
