import { ensure } from 'tiny-types/lib/ensure';
import { isDefined, Predicate, TinyType } from 'tiny-types';
import { uuid, isUuid } from 'uuidv4';

export abstract class Entity<T> {
  protected readonly _id: string;
  public readonly props: T;
  constructor(props: T, id?: string) {
    if (id && !isUuid(id)) throw new Error('Invalid id');
    this._id = id || uuid();
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

    return this._id === object._id ? true : false;
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
