import { ProductCategory } from '../domain/productCategory';
import { BaseRepository } from 'shared/core/utils/entityRepository';

export interface IProductCategoryRepository<ProductCategory> {
  findByName(name: string): Promise<ProductCategory | undefined>;
}
