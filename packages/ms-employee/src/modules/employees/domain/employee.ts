import { Either, left, right } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { Guard } from 'shared/core/utils/guard';
import { LocationCreatedEvent } from './events/locationCreated-Event';
import { validate, v4 } from 'uuid';
import { Departament } from '@modules/departaments/domain/departament';
export interface IEmployeeProps {
  id?: string;
  matricula: string;
  first_name: string;
  last_name: string;
  departament: Departament;
}
export class Employee extends AggregateRoot<Omit<IEmployeeProps, 'id'>> {
  private constructor(props: IEmployeeProps, id?: string) {
    super(props, id);
  }
  public static create = (
    props: Omit<IEmployeeProps, 'id'>,
    id?: string,
  ): Promise<Either<Error, Employee>> => {
    return new Promise<Either<Error, Employee>>((resolve, reject) => {
      if (!id) id = v4();
      if (!validate(id)) {
        return reject(left(new Error(`Id not is a valid UUID`)));
      }
      const employee = new Employee(props, id);
      return resolve(right(employee));
    }).catch((error: Error) => {
      throw error;
    });
  };
  public serialize() {
    return null;
  }
}
