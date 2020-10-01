import { Result } from '../utils/result';

export default interface IMapperr<T> {
  toPersistence(t: any): Result<T>;
  toDomain(raw: any): Result<T>;
}
