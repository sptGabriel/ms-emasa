import { LocationEntity } from '../domain/location.entity';
import { LocationRepository } from '../domain/interfaces/locationRepository';
import { EntityRepository } from '@mikro-orm/postgresql';
import { MikroClient } from 'shared/app/OrmClient';
import { inject } from 'tsyringe';
export class LocationRepositoryImp
  extends EntityRepository<LocationEntity>
  implements LocationRepository<LocationEntity> {}
