import { Location } from '@modules/locations/domain/location';
import { BaseRepository } from 'shared/core/utils/baseRepository';

export interface ILocationRepository<Location>
  extends BaseRepository<Location> {}
