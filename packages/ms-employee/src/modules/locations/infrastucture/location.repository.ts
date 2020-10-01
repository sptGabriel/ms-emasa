import { ILocationRepository } from './contracts/locationRepository';
import { LocationModel } from './location.model';
import { LocationSeats } from '../domain/location';
import { Model, ModelObject } from 'objection';
import { BaseRepository } from 'shared/core/utils/entityRepository';
import { container } from 'tsyringe';
import { LocationMapper } from '../mappers/location.mapper';
export class LocationRepository extends BaseRepository<
  LocationSeats,
  LocationModel
> {
  constructor() {
    super(
      container.resolve('knex'),
      LocationModel,
      container.resolve<LocationMapper<LocationSeats>>(LocationMapper),
    );
  }
}
