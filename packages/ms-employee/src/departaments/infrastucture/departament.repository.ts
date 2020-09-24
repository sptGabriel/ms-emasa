import { EntityRepository } from '@mikro-orm/postgresql';
import { DepartamentEntity } from '../domain/departament.entity';
import { DepartamentRepository } from '../domain/interfaces/departamentRepository';
export class DepartamentRepositoryImp
  extends EntityRepository<DepartamentEntity>
  implements DepartamentRepository<DepartamentEntity> {}
