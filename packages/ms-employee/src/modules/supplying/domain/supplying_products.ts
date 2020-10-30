import { Either, left, right } from '../../../shared/core/utils/result';
import { validate, v4 } from 'uuid';
import { Product } from '@modules/products/domain/product';
import { Supplying } from './supplying';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
export interface ISuppliedProductsProps {
  product_id: string;
  supply_id: string;
  quantity: number;
  product?: Product;
  supply?: Supplying;
}
export class SuppliedProducts extends AggregateRoot<ISuppliedProductsProps> {
  private constructor(props: ISuppliedProductsProps) {
    super(props);
  }
  public static create = (props: ISuppliedProductsProps): SuppliedProducts => {
    const isProductUUID = props.product_id
      ? validate(props.product_id)
      : undefined;
    if (isProductUUID === false)
      throw new Error(`Product_ID not is a valid UUID`);
    const isSupplyUUID = props.supply_id
      ? validate(props.supply_id)
      : undefined;
    if (isSupplyUUID === false)
      throw new Error(`Supply_ID not is a valid UUID`);
    const supplying = new SuppliedProducts(props);
    return supplying;
  };
  public toPersistence = () => {
    return this.props;
  };
  // public static toDomain = (props: ISuppliedProductsProps) => {
  //   const supplying = SuppliedProducts.create(props);
  //   if (supplying.isLeft()) throw supplying.value;
  //   return supplying.value;
  // };
}
