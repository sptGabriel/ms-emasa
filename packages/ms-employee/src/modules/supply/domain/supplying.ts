import { Either, left, right } from '../../../shared/core/utils/result';
import { validate, v4 } from 'uuid';
import { Supplier } from './supplier';
import { Product } from '@modules/products/domain/product';
import { Contract } from '@modules/contracts/domain/contract';
export interface products {
  id: string;
  quantity: string;
}
export interface ISupplyingProps {
  id?: string;
  supplier_id: string;
  contract_id: string;
  supplier?: Supplier;
  arrived: boolean;
  orderedAt?: Date;
  arrivesAt?: Date;
  contract?: Contract;
  products: products[];
}
export class Supplying implements ISupplyingProps {
  readonly id: string;
  readonly supplier?: Supplier;
  readonly arrived: boolean;
  readonly orderedAt: Date;
  readonly arrivesAt: Date;
  readonly contract?: Contract;
  readonly supplier_id: string;
  readonly contract_id: string;
  readonly products: products[];
  private constructor(props: ISupplyingProps) {
    Object.assign(this, props);
    this.arrivesAt = new Date();
    this.orderedAt = new Date();
    if (!props.id) this.id = v4();
  }
  public static create = (props: ISupplyingProps): Either<Error, Supplying> => {
    const isUUID = props.id ? validate(props.id) : undefined;
    if (isUUID === false) return left(new Error(`Id not is a valid UUID`));
    const supplying = new Supplying(props);
    return right(supplying);
  };
  public static toDomain = (props: ISupplyingProps) => {
    const supplying = Supplying.create(props);
    if (supplying.isLeft()) throw supplying.value;
    return supplying.value;
  };
}
