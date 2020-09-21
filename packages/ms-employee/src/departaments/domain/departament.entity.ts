import { Property } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/domain/Base.entity';
import { Departament } from './interfaces/departament.contract';

export class DepartamentEntity extends BaseEntity implements Departament {
  @Property()
  departament_name: string;
  @Property()
  manager_id: string;
  @Property()
  location_id: string;
}
