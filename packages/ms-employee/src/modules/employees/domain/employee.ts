import { Either, left, right } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { Guard } from 'shared/core/utils/guard';
import { LocationCreatedEvent } from './events/locationCreated-Event';
import { validate, v4 } from 'uuid';
import { Departament } from '@modules/departaments/domain/departament';
export enum EnumEmployeePostions {
  diretor = 'diretor',
  gerente = 'gerente',
  tecnico = 'tecnico',
}
export interface IEmployeeProps {
  id?: string;
  matricula: string;
  first_name: string;
  last_name: string;
  position: EnumEmployeePostions;
  departament_id: string;
  departament?: Departament;
}
export const isEmployee = (obj: any): obj is Employee => {
  return obj !== undefined;
};
export class Employee implements IEmployeeProps {
  readonly id: string;
  readonly matricula: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly departament: Departament;
  readonly position: EnumEmployeePostions;
  readonly departament_id: string;
  private constructor(props: IEmployeeProps) {
    Object.assign<Employee, IEmployeeProps>(this, props);
    if (!props.id) this.id = v4();
  }
  public static create = (props: IEmployeeProps): Either<Error, Employee> => {
    const isUUID = props.id ? validate(props.id) : undefined;
    if (isUUID === false) return left(new Error(`Id not is a valid UUID`));
    const employee = new Employee(props);
    return right(employee);
  };
  public static toDomain = (props: IEmployeeProps) => {
    const employee = Employee.create({
      ...props,
      departament: props.departament
        ? Departament.toDomain(props.departament)
        : undefined,
    });
    if (employee.isLeft()) throw employee.value;
    return employee.value;
  };
}
