import { Either, left, right } from '../../../shared/core/utils/result';
import { validate, v4 } from 'uuid';
import { SuppliedProducts, ISuppliedProductsProps } from './supplying_products';
import { Supplier } from '@modules/supplier/domain/supplier';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { UniqueEntityID } from 'shared/core/domain/uniqueEntityID';
export interface ISupplyingProps {
  supplier_id: string;
  arrived: boolean;
  orderedAt: Date;
  arrivesAt: Date;
  supplier?: Supplier;
  supplied_products?: SuppliedProducts[] | SuppliedProducts;
}
export class Supplying extends AggregateRoot<ISupplyingProps> {
  get orderedAt() {
    return this.props.orderedAt;
  }
  get arrivesAt() {
    return this.props.arrivesAt;
  }
  get arrived(): boolean {
    return this.props.arrived;
  }
  get supplier_id(): string {
    return this.props.supplier_id;
  }
  get suppliedProducts() {
    if (this.props.supplied_products) return this.props.supplied_products;
  }
  private constructor(props: ISupplyingProps, id?: UniqueEntityID) {
    super(props);
  }
  public setSuppliedProducts = (
    products: SuppliedProducts | SuppliedProducts[],
  ) => {
    this.props.supplied_products = products;
  };
  public static create = (props: ISupplyingProps, id?: string): Supplying => {
    const hasID = id ? new UniqueEntityID(id) : null;
    const supplying = hasID
      ? new Supplying(props, hasID)
      : new Supplying(props);
    return supplying;
  };
  public toPersistence = () => {
    return { id: this.id.toValue(), ...this.props };
  };
  // public static toDomain = (props: ISupplyingProps) => {
  //   const supplying = Supplying.create(props);
  //   if (supplying.isLeft()) throw supplying.value;
  //   return supplying.value;
  // };
}
