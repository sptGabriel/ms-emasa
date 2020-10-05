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
  public findById = async (id: string): Promise<Departament> => {
    const rawDepartament = this.Query.where(id);
    const domainDepartament: Departament = rawDepartament;
  };
  public findAll = async (): Promise<Departament[]> => {
    throw new Error('Method not implemented.');
  };
  public create = async (item: Object): Promise<Departament> => {
    throw new Error('Method not implemented.');
  };
  public update = async (
    id: string,
    item: Departament,
  ): Promise<Departament> => {
    throw new Error('Method not implemented.');
  };
  public delete = async (id: string): Promise<Departament> => {
    throw new Error('Method not implemented.');
  };
  public findByName = async (name: string): Promise<Departament> => {
    throw new Error('Method not implemented.');
  };
  constructor(db: Knex, mapper: IMapper<Departament>, table: string) {
    super(db, mapper, table);
  }
}
