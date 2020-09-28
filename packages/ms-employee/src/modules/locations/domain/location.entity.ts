import { AggregateRoot } from 'shared/core/domain/aggregate-root';
interface ILocation {
  street_address: string;
  postal_code: string;
}
export class Location extends AggregateRoot implements ILocation {
  get address(): string {
    return this.street_address;
  }

  get postalCode(): string {
    return this.postal_code;
  }
}
