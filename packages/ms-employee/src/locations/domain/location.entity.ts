import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/domain/Base.entity';
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
}
