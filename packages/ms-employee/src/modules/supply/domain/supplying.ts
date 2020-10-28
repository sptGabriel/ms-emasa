import { Either, left, right } from '../../../shared/core/utils/result';
import { validate, v4 } from 'uuid';
import { Supplier } from './supplier';
import { SupplyingProducts } from './supplying_products';
export interface ISupplyingProps {
  id?: string;
  supplier_id: string;
  arrived: boolean;
  orderedAt?: Date;
  arrivesAt?: Date;
  supplier?: Supplier;
  supplied_products?: SupplyingProducts[];
}
export class Supplying implements ISupplyingProps {
  readonly id: string;
  readonly supplier_id: string;
  readonly orderedAt: Date;
  readonly arrivesAt: Date;
  readonly arrived: boolean;
  readonly supplier?: Supplier;
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
