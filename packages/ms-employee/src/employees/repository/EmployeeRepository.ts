import { inject, injectable, singleton } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { BaseRepository } from '../../shared/contracts/BaseRepository';
import { Employee } from '../models/Employee';
@singleton()
export class EmployeeRepository implements BaseRepository<Employee> {
  private ormRepository: Repository<Employee>;
  constructor() {
    this.ormRepository = getRepository(Employee);
  }
  public save = async (entity: Employee): Promise<Employee> => {
    return await this.ormRepository.save(entity);
  };
  public findAll = async (): Promise<Employee[]> => {
    return await this.ormRepository.find();
  };
  public findById = async (id: string): Promise<Employee | undefined> => {
    return await this.ormRepository.findOne({ where: { id } });
  };
  public create = async (data: object): Promise<Employee> => {
    const departament = this.ormRepository.create(data);
    return await this.ormRepository.save(departament);
  };
}
