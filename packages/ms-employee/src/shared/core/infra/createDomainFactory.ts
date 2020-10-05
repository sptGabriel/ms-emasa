import { Either } from '../utils/result';

export interface DomainCreator<T> {
  create(props: any, id?: string): Promise<T>;
}
