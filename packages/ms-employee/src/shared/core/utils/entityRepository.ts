import { LocationModel } from '@modules/locations/infrastucture/location.model';
import { Location } from '@modules/locations/domain/location.entity';
import { Model } from 'objection';
import Knex from 'knex';

export interface IRead<T> {
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
export interface IWrite<T> {
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<T>;
}
const _validateIsModel = (model: Model): Boolean => {
  let parentClass = Object.getPrototypeOf(model);
  while (parentClass.name !== 'Model' && parentClass.name !== '') {
    parentClass = Object.getPrototypeOf(parentClass);
  }
  if (parentClass.name === 'Model') return true;
  return false;
};
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  private knex: Knex;
  private model: Model;
  constructor(knex: Knex, model: Model) {
    this.knex = knex;
    this.model = model;
  }
  public get Model() {
    if (!this.model) throw new Error('Model not implemented.');
    return this.model;
  }
  public get Knex() {
    if (!this.knex)
      throw new Error('Knex connection instance not implemented.');
    return this.knex;
  }
  public findAll = async (): Promise<T[]> => {
    const rawValues = await this.model.$query();
    throw new Error('Method not implemented.');
  };

  public find = async (id: string): Promise<T> => {
    const rawFind = await this.model.$query().findById(id);
    throw new Error('Method not implemented.');
  };
  public create = async (item: T): Promise<T> => {
    const rawCreate = await this.model.$query().insert(item);
    throw new Error('Method not implemented.');
  };
  public update = async (id: string, item: T): Promise<T> => {
    const rawUpdate = await this.model.$query().patchAndFetchById(id, item);
    throw new Error('Method not implemented.');
  };
  public delete = async (id: string): Promise<T> => {
    const rawDelete = await this.model.$query().deleteById(id);
    throw new Error('Method not implemented.');
  };
}
