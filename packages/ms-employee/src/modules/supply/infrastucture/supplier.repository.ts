import { Supplier } from '../domain/supplier';
import { BaseRepository } from 'shared/core/utils/entityRepository';

export interface ISupplierRepository<Supplier> {
  findbyCNPJ(cnpj: string): Promise<Supplier | undefined>;
}
