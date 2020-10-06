import { Either } from '../utils/result';

export interface IMapper<T> {
  toPersistence(t: any): T;
  toDomain(raw: any): Promise<T>;
}
