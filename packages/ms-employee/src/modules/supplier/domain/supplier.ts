import { Either, left, right } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { validate, v4 } from 'uuid';
import { Employee, IEmployeeProps } from '@modules/employees/domain/employee';
export interface ISupplierProps {
  id?: string;
  cnpj: string;
  supplier_name: string;
  supplier_email: string;
  description: string;
}
export const isSupplier = (obj: any): obj is Supplier => {
  return obj !== undefined;
};
export class Supplier implements ISupplierProps {
  readonly id: string;
  readonly cnpj: string;
  readonly supplier_name: string;
  readonly supplier_email: string;
  readonly description: string;
  private constructor(props: ISupplierProps) {
    Object.assign(this, props);
    if (!props.id) this.id = v4();
  }
  public static create = (props: ISupplierProps): Either<Error, Supplier> => {
    const isUUID = props.id ? validate(props.id) : undefined;
    if (isUUID === false) return left(new Error(`Id not is a valid UUID`));
    const supplier = new Supplier(props);
    return right(supplier);
  };
  public static toDomain = (props: ISupplierProps) => {
    const supplier = Supplier.create(props);
    if (supplier.isLeft()) throw supplier.value;
    return supplier.value;
  };
}
