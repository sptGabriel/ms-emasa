import { ILocationRepository } from './contracts/locationRepository';
import { LocationModel } from './location.model';
import { Location } from '../domain/location.entity';
import { Model, ModelObject } from 'objection';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';

export class LocationRepository extends BaseRepository<Location> {
  constructor() {
    super(container.resolve('knex'), LocationModel);
  }
}
