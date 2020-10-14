import { Either, left, right } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { validate, v4 } from 'uuid';
import { Employee, IEmployeeProps } from '@modules/employees/domain/employee';
export interface IDepartamentProps {
  id?: string;
  departament_name: string;
  manager: Employee | null;
}
export class Departament extends AggregateRoot implements IDepartamentProps {
  readonly id: string;
  readonly departament_name: string;
  readonly manager: Employee;
  private constructor(props: IDepartamentProps) {
    super();
    Object.assign(this, props);
    if (!props.id) this.id = v4();
  }
  public static create = (
    props: IDepartamentProps,
  ): Either<Error, Departament> => {
    const isUUID = props.id ? validate(props.id) : false;
    if (!isUUID) return left(new Error(`Id not is a valid UUID`));
    const departament = new Departament(props);
    return right(departament);
  };
  public static toDomain = (props: IDepartamentProps): Departament => {
    const employee = Employee.create({
      id: props.manager?.id,
      first_name: props.manager?.first_name,
      last_name: props.manager?.last_name,
      matricula: props.manager?.matricula,
    });
    if (employee.isLeft()) throw employee.value;
    const instance: IDepartamentProps = departamentDTO;
    instance.manager = employee.value;
    const departament = Departament.create(instance);
    if (departament.isLeft()) throw departament.value;
    return departament.value;
  };
  serialize() {
    throw new Error('Method not implemented.');
  }
}
