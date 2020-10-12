import { Either, left, right } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { Guard } from 'shared/core/utils/guard';
import { LocationCreatedEvent } from './events/locationCreated-Event';
import { validate } from 'uuid';
import { Employee } from '@modules/employees/domain/employee';
export interface IDepartamentProps {
  id: string;
  departament_name: string;
  manager: Employee;
  employees?: string[];
}
export interface IDepartamentResponse {
  id: string;
  departament_name: string;
  manager_id: string | null;
}
export class Departament extends AggregateRoot<Omit<IDepartamentProps, 'id'>> {
  get DepartamentName(): string {
    return this.props.departament_name;
  }
  get ManagerID(): string {
    return this.props.manager.Identity;
  }
  private constructor(props: IDepartamentProps, id?: string) {
    super(props, id);
  }
  public static create = (
    props: IDepartamentProps,
    id?: string,
  ): Promise<Either<Error, Departament>> => {
    return new Promise<Either<Error, Departament>>((resolve, reject) => {
      const guardedProps = [
        { argument: props.departament_name, argumentName: 'departament_name' },
        { argument: props.manager, argumentName: 'manager' },
      ];
      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      if (!guardResult.succeeded) reject(left(new Error(guardResult.message)));
      if (!validate(props.manager.Identity)) {
        return reject(left(new Error(`Manager_id not is a valid UUID`)));
      }
      const departament = new Departament(props, id);
      const idWasProvided = !!id;
      if (!idWasProvided) {
        departament.when(new LocationCreatedEvent(departament));
      }
      return resolve(right(departament));
    }).catch((error: Error) => {
      throw error;
    });
  };
  public serialize(): IDepartamentResponse {
    return {
      id: this.id,
      departament_name: this.DepartamentName,
      manager_id: this.ManagerID,
    };
  }
}
