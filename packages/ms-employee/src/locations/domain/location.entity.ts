import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/core/base.entity';
import { Location } from './interfaces/location.contract';
import { LocationRepositoryImp } from '../infrastucture/location.repository';

@Entity({ customRepository: () => LocationRepositoryImp })
export class LocationEntity extends BaseEntity implements Location {
  @Property()
  stret_address: string;
  @Property()
  postal_code: string;
  @Property()
  number: number;

  [EntityRepositoryType]?: LocationRepositoryImp;
}
