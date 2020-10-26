import { Either, left, right } from '../../../shared/core/utils/result';
import { validate, v4 } from 'uuid';
import { ProductCategory } from './productCategory';
export interface IProductProps {
  id?: string;
  name: string;
  codReference: string;
  category_id?: string;
  category?: ProductCategory;
}
export const isProduct = (obj: any): obj is Product => {
  return obj !== undefined;
};
export class Product implements IProductProps {
  readonly id: string;
  readonly name: string;
  readonly codReference: string;
  readonly category_id: string;
  readonly category?: ProductCategory;
  private constructor(props: IProductProps) {
    Object.assign(this, props);
    if (!props.id) this.id = v4();
  }
  public static create = (props: IProductProps): Either<Error, Product> => {
    const isUUID = props.id ? validate(props.id) : undefined;
    if (isUUID === false) return left(new Error(`Id not is a valid UUID`));
    const product = new Product(props);
    return right(product);
  };
  public static toDomain = (props: IProductProps) => {
    const product = Product.create(props);
    if (product.isLeft()) throw product.value;
    return product.value;
  };
}
