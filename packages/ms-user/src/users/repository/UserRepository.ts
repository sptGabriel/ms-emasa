import { inject, injectable, singleton } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { BaseRepository } from '../../shared/contracts/BaseRepository';
import { User } from '../models/User';
@singleton()
export class UserRepository implements BaseRepository<User> {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }
  public save = async (entity: User): Promise<User> => {
    return await this.ormRepository.save(entity);
  };
  public findAll = async (): Promise<User[]> => {
    return await this.ormRepository.find();
  };
  public findById = async (id: string): Promise<User | undefined> => {
    return await this.ormRepository.findOne({ where: { employee_id: id } });
  };
  public create = async (data: object): Promise<User> => {
    const departament = this.ormRepository.create(data);
    return await this.ormRepository.save(departament);
  };
}
