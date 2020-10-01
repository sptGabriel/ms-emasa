import { LocationModel } from '@modules/locations/infrastucture/location.model';
import { Location } from '@modules/locations/domain/location';
import { Model, ModelClass } from 'objection';
import Knex from 'knex';
import IMapper from '../infra/mapper';

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
export abstract class BaseRepository<T, M extends Model>
  implements IWrite<T>, IRead<T> {
  private knex: Knex;
  private model: ModelClass<M>;
  private mapper: IMapper<T>;
  constructor(knex: Knex, model: ModelClass<M>, mapper: IMapper<T>) {
    this.knex = knex;
    this.model = model;
    this.mapper = mapper;
  }
  public get Mapper() {
    if (!this.mapper) throw new Error('Mapper not implemented.');
    return this.mapper;
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
    const rawValues = await this.model.query();
    const rawtoDomain = rawValues.map(raw => {
      return this.mapper.toDomain(raw);
    });
    return rawtoDomain;
  };
  public find = async (id: string): Promise<T> => {
    const rawValue = await this.model.query().findById(id);
    return this.mapper.toDomain(rawValue);
  };
  public create = async (item: T): Promise<T> => {
    const rawValue = await this.model.query().insert(item);
    return this.mapper.toDomain(rawValue);
  };
  public update = async (id: string, item: T): Promise<T> => {
    const rawValue = await this.model.query().patchAndFetchById(id, item);
    return this.mapper.toDomain(rawValue);
  };
  public delete = async (id: string): Promise<T> => {
    const rawValue = await this.model.query().deleteById(id);
    return this.mapper.toDomain(rawValue);
  };
}
