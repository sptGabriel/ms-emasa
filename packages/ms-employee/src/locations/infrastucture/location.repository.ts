import { LocationEntity } from '../domain/location.entity';
import { LocationRepository } from '../domain/interfaces/locationRepository';
import {
  RequestContext,
  Repository,
  Connection,
  MikroORM,
  DatabaseDriver,
} from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { inject } from 'tsyringe';
import { MikroClient } from 'shared/app/OrmClient';
export class LocationRepositoryImp
  implements LocationRepository<LocationEntity> {
  private repository: EntityRepository<LocationEntity>;
  constructor(@inject(MikroClient) private database: MikroClient) {
    this.repository = this.database
      .getConnection()
      .em.getRepository(LocationEntity);
  }
}
