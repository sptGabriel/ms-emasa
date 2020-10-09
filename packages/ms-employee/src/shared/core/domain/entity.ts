import { ensure } from 'tiny-types/lib/ensure';
import { isDefined, Predicate, TinyType } from 'tiny-types';
import { uuid } from 'uuidv4';
import { validate } from 'uuid';

export abstract class Entity<T> {
  protected readonly id: string;
  public readonly props: T;
  constructor(props: T, id?: string) {
    if (id && !validate(id)) throw new Error('Invalid id');
    this.id = id || uuid();
    this.props = props;
  }
  public equals(object: Entity<T>): boolean {
    if (object == null) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!isEntity(object)) {
      return false;
    }

    return this.id === object.id ? true : false;
  }
}
function isEntity(v?: object): boolean {
  return v instanceof Entity;
}
export function isNotEmpty(): Predicate<string | ReadonlyArray<string>> {
  return Predicate.to(
    `be not empty`,
    (value: string | ReadonlyArray<string>): boolean =>
      !(value == null || value.length === 0),
  );
}
