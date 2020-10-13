import { Either, left, right } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { Guard } from 'shared/core/utils/guard';
import { LocationCreatedEvent } from './events/locationCreated-Event';
import { validate, v4 } from 'uuid';
import { Employee } from '@modules/employees/domain/employee';
export interface IDepartamentProps {
  id: string;
  departament_name: string;
  manager: Employee | null;
}
export class Departament extends AggregateRoot implements IDepartamentProps {
  readonly id: string;
  readonly departament_name: string;
  readonly manager: Employee;
  private constructor(props: Omit<IDepartamentProps, 'id'>, id?: string) {
    super();
    Object.assign(this, props);
    if (!id) this.id = v4();
  }
  public static create = (
    props: Omit<IDepartamentProps, 'id'>,
    id?: string,
  ): Promise<Either<Error, Departament>> => {
    return new Promise<Either<Error, Departament>>((resolve, reject) => {
      const isUUID = id ? validate(id) : false;
      if (!isUUID) return reject(left(new Error(`Id not is a valid UUID`)));
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
  serialize() {
    throw new Error('Method not implemented.');
  }
}
