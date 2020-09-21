import { DepartamentEntity } from '../domain/departament.entity';
import { Departament } from '../domain/interfaces/departament.contract';
import { DepartamentRepository } from '../domain/interfaces/departamentRepository';
export class DepartamentRepositoryImp
  implements DepartamentRepository<DepartamentEntity> {
  constructor() {}
  findAll = (): Promise<DepartamentEntity[]> => {
    throw new Error('Method not implemented.');
  };
  findOne = (value: string): Promise<DepartamentEntity | undefined> => {
    throw new Error('Method not implemented.');
  };
  create = (data: object): Promise<DepartamentEntity> => {
    throw new Error('Method not implemented.');
  };
  update = (entity: DepartamentEntity): Promise<DepartamentEntity> => {
    throw new Error('Method not implemented.');
  };
  delete = (entity: DepartamentEntity): Promise<DepartamentEntity> => {
    throw new Error('Method not implemented.');
  };
  save = (entity: DepartamentEntity): Promise<DepartamentEntity> => {
    throw new Error('Method not implemented.');
  };
}
