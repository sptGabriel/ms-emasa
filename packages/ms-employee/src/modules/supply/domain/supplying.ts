import { Either, left, right } from '../../../shared/core/utils/result';
import { validate, v4 } from 'uuid';
import { Supplier } from './supplier';
export interface ISupplyingProps {
  id?: string;
  supplier: Supplier;
  arrived: boolean;
  orderedAt: Date;
  arrivedAt: Date;
}
export class Supplying implements ISupplyingProps {
  readonly id: string;
  readonly supplier: Supplier;
  readonly arrived: boolean;
  readonly orderedAt: Date;
  readonly arrivedAt: Date;
  private constructor(props: ISupplyingProps) {
    Object.assign(this, props);
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
