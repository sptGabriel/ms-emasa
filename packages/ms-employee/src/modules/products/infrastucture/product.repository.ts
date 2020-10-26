import { Product } from '../domain/product';
import { BaseRepository } from 'shared/core/utils/entityRepository';

export interface IProductRepository<Product> {
  findCodReference(name: string): Promise<Product | undefined>;
}
