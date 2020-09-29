import {
  IDatabaseDriver,
  RequestContext,
  Connection,
  EntityManager,
  EntityRepository,
} from '@mikro-orm/core';

import { injectable } from 'tsyringe';

//   implements LocationRepository<LocationEntity> {}
export class LocationRepository {
  private EntityManager: EntityManager;
  protected readonly repository: EntityRepository<WriteModelType>;
  constructor(context: RequestContext) {
    this.EntityManager = context.em;
  }
}
