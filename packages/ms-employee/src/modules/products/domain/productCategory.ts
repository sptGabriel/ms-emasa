import { Either, left, right } from '../../../shared/core/utils/result';
import { validate, v4 } from 'uuid';
export interface IProductCategoryProps {
  id?: string;
  parent: ProductCategory | ProductCategory[];
  name: string;
}
export const isProductCategory = (obj: any): obj is ProductCategory => {
  return obj !== undefined;
};
export class ProductCategory implements IProductCategoryProps {
  readonly id: string;
  readonly parent: ProductCategory;
  readonly name: string;
  private constructor(props: IProductCategoryProps) {
    Object.assign(this, props);
    if (!props.id) this.id = v4();
  }
  public static create = (
    props: IProductCategoryProps,
  ): Either<Error, ProductCategory> => {
    const isUUID = props.id ? validate(props.id) : undefined;
    if (isUUID === false) return left(new Error(`Id not is a valid UUID`));
    const productCategory = new ProductCategory(props);
    return right(productCategory);
  };
  public static toDomain = (props: IProductCategoryProps) => {
    const productCategory = ProductCategory.create(props);
    if (productCategory.isLeft()) throw productCategory.value;
    return productCategory.value;
  };
}
