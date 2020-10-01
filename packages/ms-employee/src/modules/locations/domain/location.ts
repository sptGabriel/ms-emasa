import { Result } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { UniqueEntityID } from '../../../shared/core/domain/unique-id';
import { Guard } from 'shared/core/utils/guard';
import { LocationCreatedEvent } from './events/locationCreated-Event';
import { CepCode } from './locationPostalCode';
export interface ILocationProps {
  stret_address: string;
  cep_code: CepCode;
}
export class LocationSeats extends AggregateRoot<ILocationProps> {
  get StretAddress(): string {
    return this.props.stret_address;
  }
  get CepCode(): CepCode {
    return this.props.cep_code;
  }
  private constructor(props: ILocationProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(
    props: ILocationProps,
    id?: UniqueEntityID,
  ): Result<LocationSeats> {
    const guardedProps = [
      { argument: props.cep_code, argumentName: 'cep_code' },
      { argument: props.stret_address, argumentName: 'stret_address' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<LocationSeats>(guardResult.message);
    }

    const location = new LocationSeats(props, id);

    const idWasProvided = !!id;

    if (!idWasProvided) {
      location.when(new LocationCreatedEvent(location));
    }

    return Result.ok<LocationSeats>(location);
  }
}
