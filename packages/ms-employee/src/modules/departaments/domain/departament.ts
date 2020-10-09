import { Either, left, right } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { Guard } from 'shared/core/utils/guard';
import { LocationCreatedEvent } from './events/locationCreated-Event';
import { uuid, isUuid } from 'uuidv4';
import { validate } from 'uuid';
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
  ): Promise<Either<Error, Departament>> => {
    return new Promise<Either<Error, Departament>>((resolve, reject) => {
      const guardedProps = [
        { argument: props.departament_name, argumentName: 'departament_name' },
        { argument: props.manager_id, argumentName: 'manager_id' },
      ];
      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      if (!guardResult.succeeded) reject(left(new Error(guardResult.message)));
      if (!validate(props.manager_id)) {
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
  public toJson(): any {
    const { id, props } = this;
    const { departament_name, manager_id } = this.props;
    const result = { id, departament_name, manager_id };
    return result;
  }
}
