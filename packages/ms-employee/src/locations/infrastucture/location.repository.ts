import { LocationEntity } from '../domain/location.entity';
import { LocationRepository } from '../domain/interfaces/locationRepository';
import {
  EntityRepository,
  RequestContext,
  GetRepository,
} from '@mikro-orm/core';
export class LocationRepositoryImp
  implements LocationRepository<LocationEntity> {
  private repository: EntityRepository<LocationEntity>;
  constructor(ctx: RequestContext) {
    this.repository = ctx.em.getRepository(LocationEntity);
  }
  public findAll(): LocationEntity[] {
    return this.repository.find();
  }
  public findOne(value: string): Promise<LocationEntity | undefined> {
    throw new Error('Method not implemented.');
  }
  public create(data: object): Promise<LocationEntity> {
    throw new Error('Method not implemented.');
  }
  public update(entity: LocationEntity): Promise<LocationEntity> {
    throw new Error('Method not implemented.');
  }
  public delete(entity: LocationEntity): Promise<LocationEntity> {
    throw new Error('Method not implemented.');
  }
  public save(entity: LocationEntity): Promise<LocationEntity> {
    throw new Error('Method not implemented.');
  }
}
