import { inject, injectable, singleton } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { BaseRepository } from '../../shared/contracts/BaseRepository';
import { Departament } from '../models/Departament';
@singleton()
export class DepartamentRepository implements BaseRepository<Departament> {
  private ormRepository: Repository<Departament>;
  constructor() {
    this.ormRepository = getRepository(Departament);
  }
  public save = async (entity: Departament): Promise<Departament> => {
    return await this.ormRepository.save(entity);
  };
  public findAll = async (): Promise<Departament[]> => {
    return await this.ormRepository.find();
  };
  public findById = async (id: string): Promise<Departament | undefined> => {
    return await this.ormRepository.findOne({ where: { id } });
  };
  public create = async (data: object): Promise<Departament> => {
    const departament = this.ormRepository.create(data);
    return await this.ormRepository.save(departament);
  };
}
