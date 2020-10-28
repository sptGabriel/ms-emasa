import { Either, left, right } from '../../../shared/core/utils/result';
import { validate, v4 } from 'uuid';
export interface ISuppliedProductsProps {
  product_id: string;
  supply_id: string;
  quantity: number;
}
export class SuppliedProducts implements ISuppliedProductsProps {
  readonly product_id: string;
  readonly supply_id: string;
  readonly quantity: number;
  private constructor(props: ISuppliedProductsProps) {
    Object.assign(this, props);
  }
  public static create = (
    props: ISuppliedProductsProps,
  ): Either<Error, SuppliedProducts> => {
    const isProductUUID = props.product_id
      ? validate(props.product_id)
      : undefined;
    const isSupplyUUID = props.supply_id
      ? validate(props.supply_id)
      : undefined;
    if (isProductUUID === false || isSupplyUUID === false)
      return left(new Error(`Id not is a valid UUID`));
    const supplying = new SuppliedProducts(props);
    return right(supplying);
  };
  public static toDomain = (props: ISuppliedProductsProps) => {
    const supplying = SuppliedProducts.create(props);
    if (supplying.isLeft()) throw supplying.value;
    return supplying.value;
  };
}
