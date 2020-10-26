import { Either, left, right } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { validate, v4 } from 'uuid';
import { Employee, IEmployeeProps } from '@modules/employees/domain/employee';
export interface IDepartamentProps {
  id?: string;
  departament_name: string;
  employees?: Employee[];
}
export class Departament implements IDepartamentProps {
  readonly id: string;
  readonly departament_name: string;
  readonly employees: Employee[];
  private constructor(props: IDepartamentProps) {
    Object.assign(this, props);
    if (!props.id) this.id = v4();
  }
  public static create = (
    props: IDepartamentProps,
  ): Either<Error, Departament> => {
    const isUUID = props.id ? validate(props.id) : undefined;
    if (isUUID === false) return left(new Error(`Id not is a valid UUID`));
    const departament = new Departament(props);
    return right(departament);
  };
  public static toDomain = (props: IDepartamentProps) => {
    const departament = Departament.create(props);
    if (departament.isLeft()) throw departament.value;
    return departament.value;
  };
}
