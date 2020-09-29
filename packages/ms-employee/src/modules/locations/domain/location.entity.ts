import { Result } from 'infra/core/eitherHandler';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { UniqueEntityID } from 'shared/core/domain/unique-entityID';
import { Guard } from 'shared/core/utils/guard';
import { LocationCreatedEvent } from './events/locationCreated-Event';
export interface ILocationProps {
  stret_address: string;
  postal_code: string;
}
export class Location extends AggregateRoot<ILocationProps> {
  get stretAddress(): string {
    return this.props.stret_address;
  }
  get postalCode(): string {
    return this.props.postal_code;
  }

  private constructor(props: ILocationProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(
    props: ILocationProps,
    id?: UniqueEntityID,
  ): Result<Location> {
    const guardedProps = [
      { argument: props.postal_code, argumentName: 'postal_code' },
      { argument: props.stret_address, argumentName: 'stret_address' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Location>(guardResult.message);
    }

    const location = new Location(props, id);

    const idWasProvided = !!id;

    if (!idWasProvided) {
      location.addDomainEvent(new LocationCreatedEvent(location));
    }

    return Result.ok<Location>(location);
  }
}
