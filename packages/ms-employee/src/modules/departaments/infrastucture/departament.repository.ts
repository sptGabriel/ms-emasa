import { Departament } from '../domain/departament';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { DepartamentMapper } from '../mappers/departament.mapper';
import { IDepartamentRepository } from '../infrastucture/contracts/departamentRepository';
import Knex from 'knex';
import { IMapper } from 'shared/core/infra/mapper';
import { raw } from 'body-parser';

export class DepartamentRepository
  extends BaseRepository<Departament>
  implements IDepartamentRepository<Departament> {
  public find = async (id: string): Promise<Departament> => {
    const rawDepartament = await this.Query.where({ id });
    const departamentDomain = await this.Mapper.toDomain(rawDepartament);
    return departamentDomain;
  };
  public findAll = async (): Promise<Departament[]> => {
    const rawResults = await this.Query.where('deleted_at', null);
    const toDomainResults = [];
    for (let raw of rawResults) {
      const rawValue = await this.Mapper.toDomain(raw);
      toDomainResults.push(rawValue);
    }
    return toDomainResults;
  };
  public create = async (item: any): Promise<Departament> => {
    const promisify = (fn: any) =>
      new Promise((resolve, reject) => fn(resolve));
    const trx: Knex.Transaction = <Knex.Transaction>(
      await promisify(this.Knex.transaction)
    );
    try {
      const rawExists = await this.findByName(item.departament_name);
      if (rawExists) {
      }
      const rawResult = await this.Query.insert(item);
      const toDomainResult = await this.Mapper.toDomain(rawResult);
      return toDomainResult;
    } catch {}
  };
  public update = async (id: string, item: any): Promise<Departament> => {
    const { departament_name, manager_id } = item;
    const rawResult = await this.Query.update({
      departament_name,
      manager_id,
    }).where({ id });
    const rawToDomain = await this.Mapper.toDomain(rawResult);
    return rawToDomain;
  };
  public delete = async (id: string): Promise<Departament> => {
    const rawResult = await this.Query.where({ id }).update(
      'deleted_at',
      new Date(),
    );
    const rawToDomain = await this.Mapper.toDomain(rawResult);
    return rawToDomain;
  };
  public findByName = async (
    departament_name: string,
  ): Promise<Departament> => {
    const rawDepartament = await this.Query.where({ departament_name }).first();
    const departamentDomain = await this.Mapper.toDomain(rawDepartament);
    return departamentDomain;
  };
  constructor(db: Knex, mapper: IMapper<Departament>, private table: string) {
    super(db, mapper, table);
  }
}
