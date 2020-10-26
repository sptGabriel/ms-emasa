import { Either, left, right } from '../../../shared/core/utils/result';
import { validate, v4 } from 'uuid';
import { ProductCategory } from './productCategory';
import { Product } from './product';
import { Employee } from '@modules/employees/domain/employee';
export enum IProductType {
  equipament = 'equipament',
  component = 'component',
}
export interface IProductInstanceProps {
  id?: string;
  serial_number: string;
  patrimony_code: string;
  product_id?: string;
  contract_id?: string;
  employee_id?: string;
  type: IProductType;
  parent: ProductInstance | ProductInstance[] | string;
  product?: Product;
  employee?: Employee;
}
export class ProductInstance implements IProductInstanceProps {
  readonly id: string;
  readonly serial_number: string;
  readonly patrimony_code: string;
  readonly product_id?: string;
  readonly contract_id?: string;
  readonly employee_id?: string;
  readonly type: IProductType;
  readonly parent: ProductInstance | string;
  readonly employee?: Employee;
  readonly product?: Product;
  private constructor(props: IProductInstanceProps) {
    Object.assign(this, props);
    if (!props.id) this.id = v4();
  }
  public static create = (
    props: IProductInstanceProps,
  ): Either<Error, ProductInstance> => {
    const isUUID = props.id ? validate(props.id) : undefined;
    if (isUUID === false) return left(new Error(`Id not is a valid UUID`));
    const productInstance = new ProductInstance(props);
    return right(productInstance);
  };
  public static toDomain = (props: IProductInstanceProps) => {
    const productInstance = ProductInstance.create(props);
    if (productInstance.isLeft()) throw productInstance.value;
    return productInstance.value;
  };
}
