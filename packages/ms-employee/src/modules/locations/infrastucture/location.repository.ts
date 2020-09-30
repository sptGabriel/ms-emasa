import { ILocationRepository } from './contracts/locationRepository';
import { LocationModel } from './location.model';
import { Location } from '../domain/location.entity';
import { Model } from 'objection';

export class LocationRepository<Location>
  implements ILocationRepository<Location> {
  private model: LocationModel;
  constructor() {}
  public find = async (Data: Object): Promise<Location> => {
    throw new Error('Method not implemented.');
  };
  public findAll(): Promise<Location> {
    throw new Error('Method not implemented.');
  }
  public create(Data: Object): Promise<Location> {
    throw new Error('Method not implemented.');
  }
  public delete(Data: Object): Promise<Location> {
    throw new Error('Method not implemented.');
  }
  public update(data: Object): Promise<Location> {
    throw new Error('Method not implemented.');
  }
}
