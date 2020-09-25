import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { DepartamentRepositoryImp } from 'departaments/infrastucture/departament.repository';
import { BaseEntity } from '../../shared/core/base.entity';
import { Departament } from './interfaces/departament.contract';
@Entity({ customRepository: () => DepartamentRepositoryImp })
export class DepartamentEntity extends BaseEntity implements Departament {
  @Property()
  departament_name: string;
  @Property()
  manager_id: string;
  @Property()
  location_id: string;

  [EntityRepositoryType]?: DepartamentRepositoryImp;
}
