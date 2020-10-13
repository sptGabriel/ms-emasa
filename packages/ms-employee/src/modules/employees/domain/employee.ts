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
  private constructor(props: Omit<IEmployeeProps, 'id'>, id?: string) {
    super();
    Object.assign(this, props);
    if (!id) this.id = v4();
  }
  public static create = (
    props: Omit<IEmployeeProps, 'id'>,
    id?: string,
  ): Promise<Either<Error, Employee>> => {
    return new Promise<Either<Error, Employee>>((resolve, reject) => {
      const isUUID = id ? validate(id) : false;
      if (!isUUID) return reject(left(new Error(`Id not is a valid UUID`)));
      const employee = new Employee(props, id);
      return resolve(right(employee));
    }).catch((error: Error) => {
      throw error;
    });
  };
  serialize() {
    throw new Error('Method not implemented.');
  }
  static fromPrimitives(plainData: IEmployeeProps, id:string): Employee {
    return new Employee(
      plainData,id
    );
  }

  toPrimitives():IEmployeeProps {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      matricula: this.matricula,
      departament: this.departament
    }
}

// export class Employee extends AggregateRoot<Omit<IEmployeeProps, 'id'>> {
//   private constructor(props: IEmployeeProps, id?: string) {
//     super(props, id);
//   }
//   public static create = (
//     props: Omit<IEmployeeProps, 'id'>,
//     id?: string,
//   ): Promise<Either<Error, Employee>> => {
//     return new Promise<Either<Error, Employee>>((resolve, reject) => {
//       if (!id) id = v4();
//       if (!validate(id)) {
//         return reject(left(new Error(`Id not is a valid UUID`)));
//       }
//       const employee = new Employee(props, id);
//       return resolve(right(employee));
//     }).catch((error: Error) => {
//       throw error;
//     });
//   };
//   public serialize() {
//     return null;
//   }
// }
