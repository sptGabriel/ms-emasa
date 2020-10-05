import { Either, left, right } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { Guard } from 'shared/core/utils/guard';
import { LocationCreatedEvent } from './events/locationCreated-Event';
export interface IDepartamentProps {
  departament_name: string;
  manager_id: string;
}
export class Departament extends AggregateRoot<IDepartamentProps> {
  get DepartamentName(): string {
    return this.props.departament_name;
  }
  get ManagerID(): string {
    return this.props.manager_id;
  }
  private constructor(props: IDepartamentProps, id?: string) {
    super(props, id);
  }
  public static create = (
    props: IDepartamentProps,
    id?: string,
  ): Departament => {
    const guardedProps = [
      { argument: props.departament_name, argumentName: 'departament_name' },
      { argument: props.manager_id, argumentName: 'manager_id' },
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) throw new Error(guardResult.message);
    const departament = new Departament(props, id);
    const idWasProvided = !!id;
    if (!idWasProvided) {
      departament.when(new LocationCreatedEvent(departament));
    }
    return departament;
  };

  // public static create(
  //   props: ILocationProps,
  //   id?: string,
  // ): Either<Error, LocationSeats> {
  //   const guardedProps = [
  //     { argument: props.cep_code, argumentName: 'cep_code' },
  //     { argument: props.stret_address, argumentName: 'stret_address' },
  //   ];
  //   const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
  //   if (!guardResult.succeeded) {
  //     return left(new Error(guardResult.message));
  //   }
  //   const location = new LocationSeats(props, id);
  //   const idWasProvided = !!id;
  //   if (!idWasProvided) {
  //     location.when(new LocationCreatedEvent(location));
  //   }
  //   return right(location);
  // }
}
