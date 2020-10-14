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
export class Employee extends AggregateRoot implements IEmployeeProps {
  readonly id: string;
  readonly matricula: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly departament: Departament;
  private constructor(props: IEmployeeProps) {
    super();
    Object.assign(this, props);
    if (!props.id) this.id = v4();
  }
  public static create = (props: IEmployeeProps): Either<Error, Employee> => {
    const isUUID = props.id ? validate(props.id) : false;
    if (!isUUID) return left(new Error(`Id not is a valid UUID`));
    const employee = new Employee(props);
    return right(employee);
  };
  serialize() {
    throw new Error('Method not implemented.');
  }
  static fromPrimitives(data: IEmployeeProps): Employee {
    return new Employee(data);
  }

  toPrimitives(): IEmployeeProps {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      matricula: this.matricula,
      departament: this.departament,
    };
  }
}
