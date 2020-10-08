import { Departament } from '../../domain/departament';
import { BaseRepository } from 'shared/core/utils/entityRepository';

export interface IDepartamentRepository<Departament> {
  findByName(name: string): Promise<Departament | undefined>;
}
