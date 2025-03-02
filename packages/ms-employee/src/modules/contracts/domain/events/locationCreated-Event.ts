import { UniqueEntityID } from '../../../../shared/core/domain/unique-id';
import { Location } from '../location';
export class LocationCreatedEvent {
  public dateTimeOccurred: Date;
  public location: Location;
  constructor(location: Location) {
    this.dateTimeOccurred = new Date();
    this.location = location;
  }
  getAggregateId(): UniqueEntityID {
    return this.location.id;
  }
}
