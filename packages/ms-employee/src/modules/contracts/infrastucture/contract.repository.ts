import { Contract } from '../domain/contract';
import { BaseRepository } from 'shared/core/utils/entityRepository';

export interface IContractRepository<Contract> {
  findBySignature(signature: string): Promise<Contract | undefined>;
}
